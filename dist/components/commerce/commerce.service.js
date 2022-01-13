"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommerceService = void 0;
const common_1 = require("@nestjs/common");
const ObjectId = require('mongoose').Types.ObjectId;
let CommerceService = class CommerceService {
    constructor(commerceRepository) {
        this.commerceRepository = commerceRepository;
    }
    async create(userDto) {
        return await this.commerceRepository.create(userDto);
    }
    async findAll() {
        return await this.commerceRepository.findAll();
    }
    async findById(id) {
        return await this.commerceRepository.findById(id);
    }
    async update(userDto, id) {
        const custommer = await this.findById(id);
        if (!custommer)
            throw new common_1.NotFoundException('custommer not exist');
        return await this.commerceRepository.update(userDto, { _id: id });
    }
    async delete(id) {
        return await this.commerceRepository.delete(id);
    }
    async findByCondition(slug) {
        return await this.commerceRepository.findByCondition({ slug: slug });
    }
    async findByConditionRelationAgregate(relation) {
        return await this.commerceRepository.findByConditionRelationAgregate(relation);
    }
    async discount(data, id) {
        const custommer = await this.findById(id);
        if (!custommer)
            throw new common_1.NotFoundException('custommer not exist');
        const { user_id, amount, status } = data;
        const maxDiscountAmount = custommer.maxDiscountAmount;
        const model = await this.commerceRepository.pushInArray({ _id: id }, {
            $push: { discounts: { user_id, amount, maxDiscountAmount, status } },
        });
        return model;
    }
    async updateDiscount(id, data) {
        const custommer = await this.findById(id);
        if (!custommer)
            throw new common_1.NotFoundException('custommer not exist');
        const model = await this.commerceRepository.pushInArray({ _id: id, 'discounts._id': data.id }, {
            $set: {
                'discounts.$.user_id': data.user_id,
                'discounts.$.maxDiscountAmount': custommer.maxDiscountAmount,
                'discounts.$.amount': data.amount,
                'discounts.$.status': data.status,
            },
        });
        return model;
    }
    async deleteDiscount(id, comId) {
        const custommer = await this.findById(comId);
        if (!custommer)
            throw new common_1.NotFoundException('custommer not exist');
        const model = await this.commerceRepository.pushInArray({ _id: comId }, {
            $pull: {
                discounts: { _id: id },
            },
        });
        return model;
    }
    async findByConditionCommerce(findByAllCondition) {
        return await this.commerceRepository.findByCondition(findByAllCondition);
    }
    async statistics(user_id, commerce_id) {
        return await this.findByConditionRelationAgregate([
            {
                $match: {
                    _id: ObjectId(commerce_id),
                },
            },
            {
                $addFields: {
                    discounts: {
                        $filter: {
                            input: '$discounts',
                            as: 'discounts',
                            cond: {
                                $eq: ['$$discounts.user_id', ObjectId(user_id)],
                            },
                        },
                    },
                    notUsediscounts: {
                        $filter: {
                            input: '$discounts',
                            as: 'discounts',
                            cond: {
                                $and: [
                                    { $eq: ['$$discounts.user_id', ObjectId(user_id)] },
                                    { $eq: ['$$discounts.status', true] },
                                ],
                            },
                        },
                    },
                    usediscounts: {
                        $filter: {
                            input: '$discounts',
                            as: 'discounts',
                            cond: {
                                $and: [
                                    { $eq: ['$$discounts.user_id', ObjectId(user_id)] },
                                    { $eq: ['$$discounts.status', false] },
                                ],
                            },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'transactions',
                    pipeline: [
                        {
                            $match: {
                                user_id: ObjectId(user_id),
                                commerce_id: ObjectId(commerce_id),
                            },
                        },
                        {
                            $group: {
                                _id: '$user_id',
                                montoTotal: { $sum: '$amount' },
                                montoEnDescuentos: { $sum: '$discount' },
                                montoLibreDescuento: {
                                    $sum: { $subtract: ['$amount', '$discount'] },
                                },
                            },
                        },
                    ],
                    as: 'statistics',
                },
            },
            {
                $lookup: {
                    from: 'transactions',
                    pipeline: [
                        {
                            $match: {
                                user_id: ObjectId(user_id),
                                commerce_id: ObjectId(commerce_id),
                            },
                        },
                    ],
                    as: 'transactions',
                },
            },
            {
                $addFields: {
                    descuentoNoUsadoAcumulado: {
                        $reduce: {
                            input: '$notUsediscounts',
                            initialValue: 0,
                            in: {
                                $add: ['$$value', '$$this.maxDiscountAmount'],
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    commerce: {
                        _id: '$_id',
                        name: '$name',
                        direction: '$direction',
                        discount: '$discount',
                        maxDiscountAmount: '$maxDiscountAmount',
                    },
                    statistics: {
                        $let: {
                            vars: {
                                stadisticas: { $arrayElemAt: ['$statistics', 0] },
                            },
                            in: {
                                $let: {
                                    vars: {
                                        neto: {
                                            $subtract: [
                                                '$$stadisticas.montoLibreDescuento',
                                                '$descuentoNoUsadoAcumulado',
                                            ],
                                        },
                                    },
                                    in: {
                                        $map: {
                                            input: '$statistics',
                                            as: 'data',
                                            in: {
                                                montoTotal: '$$data.montoLibreDescuento',
                                                montoNeto: '$$neto',
                                                montoaGastadoEnDescuentos: '$$data.montoEnDescuentos',
                                                faltante: {
                                                    $subtract: ['$maxDiscountAmount', '$$neto'],
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    discounts: {
                        $reduce: {
                            input: '$notUsediscounts',
                            initialValue: { sum: 0 },
                            in: {
                                descuentosAcumulados: {
                                    $multiply: ['$discount', { $size: '$notUsediscounts' }],
                                },
                                disponibles: {
                                    $size: '$notUsediscounts',
                                },
                                utilizados: {
                                    $size: '$usediscounts',
                                },
                            },
                        },
                    },
                    transactions: 4,
                },
            },
        ]);
    }
};
CommerceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CommerceRepositoryInterface')),
    __metadata("design:paramtypes", [Object])
], CommerceService);
exports.CommerceService = CommerceService;
//# sourceMappingURL=commerce.service.js.map