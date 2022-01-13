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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const ObjectId = require('mongoose').Types.ObjectId;
const const_1 = require("../../common/constants/const");
const relations_1 = require("../../common/constants/relations");
const array_crud_1 = require("../../common/inquiries/array.crud");
let TransactionsService = class TransactionsService {
    constructor(transactionRepository, commerceService, customerService) {
        this.transactionRepository = transactionRepository;
        this.commerceService = commerceService;
        this.customerService = customerService;
    }
    async findByAllConditionRelation(id, relation) {
        if (relations_1.Relations.user !== relation)
            return this.transactionRepository.findByAllConditionRelation({ user_id: id }, relation);
        else
            return this.transactionRepository.findByAllConditionRelation({ commerce_id: id }, relation);
    }
    async findByConditionRelationAgregate(relation) {
        return await this.transactionRepository.findByConditionRelationAgregate(relation);
    }
    async discount(comerce_id, mount, user_id) {
        const commerce = await this.commerceService.findById(comerce_id);
        const { discount, maxDiscountAmount } = commerce;
        if (maxDiscountAmount <= mount) {
            const result = mount / discount;
            if (result > const_1.Cont.discount)
                for (let index = 0; index < result; index++) {
                    await this.commerceService.discount({ amount: discount, user_id, status: true }, comerce_id);
                }
        }
    }
    async useDiscount(condition) {
        const commerce = await this.commerceService.findByConditionRelationAgregate(condition);
        return commerce;
    }
    async filterUser(condition) {
        const data = await this.customerService.findByCondition(condition);
        return data;
    }
    async resultAmount(user_id, commerce_id) {
        const data = await this.findByConditionRelationAgregate([
            {
                $match: {
                    user_id: ObjectId(user_id),
                    commerce_id: ObjectId(commerce_id),
                },
            },
            {
                $group: {
                    _id: '$user_id',
                    accumulatedAmount: { $sum: '$amount' },
                    discountsUsed: { $sum: '$discount' },
                    montoLibreDescuento: {
                        $sum: { $subtract: ['$amount', '$discount'] },
                    },
                },
            },
            {
                $lookup: {
                    from: 'commerces',
                    let: { order_item: '$_id' },
                    pipeline: [
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
                    ],
                    as: 'commerce',
                },
            },
            { $unwind: { path: '$commerce' } },
            {
                $addFields: {
                    descuentoNoUsadoAcumulado: {
                        $reduce: {
                            input: '$commerce.notUsediscounts',
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
                    commerce: 1,
                    discount: '$commerce.discount',
                    statistics: {
                        $let: {
                            vars: {
                                neto: {
                                    $subtract: [
                                        '$montoLibreDescuento',
                                        '$descuentoNoUsadoAcumulado',
                                    ],
                                },
                            },
                            in: {
                                montoNeto: '$montoLibreDescuento',
                                montoReclamable: '$$neto',
                                faltante: {
                                    $subtract: ['$commerce.maxDiscountAmount', '$$neto'],
                                },
                                descuentoReclamable: {
                                    $divide: ['$$neto', '$commerce.maxDiscountAmount'],
                                },
                            },
                        },
                    },
                    discounts: {
                        descuentosAcumulados: {
                            $multiply: [
                                '$commerce.discount',
                                { $size: '$commerce.notUsediscounts' },
                            ],
                        },
                        disponibles: {
                            $size: '$commerce.notUsediscounts',
                        },
                        utilizados: {
                            $size: '$commerce.usediscounts',
                        },
                    },
                    transactions: 1,
                },
            },
        ]);
        return data[0];
    }
    async commerce(id) {
        const data = await this.findByConditionRelationAgregate([
            {
                $match: {
                    user_id: ObjectId(id),
                },
            },
        ]);
        return data;
    }
    async validate(userDto) {
        const result = await this.resultAmount(userDto.user_id, userDto.commerce_id);
        if (result) {
            const discount = {
                user_id: userDto.user_id,
                amount: result.discount,
                status: true,
            };
            const iteration = Math.trunc(result.statistics['descuentoReclamable']);
            for (let index = 0; index < iteration;) {
                await this.commerceService.discount(discount, userDto.commerce_id);
                index++;
            }
            return result;
        }
        return result;
    }
    async create(userDto) {
        const result = await this.transactionRepository.create(userDto);
        await this.validate(userDto);
        return await this.resultAmount(userDto.user_id, userDto.commerce_id);
    }
};
TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('transactionsRepositoryInterface')),
    __param(1, (0, common_1.Inject)('commerceServiceInterface')),
    __param(2, (0, common_1.Inject)('customerServiceInterface')),
    __metadata("design:paramtypes", [Object, Object, Object])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map