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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const encryption_1 = require("../../common/encryption");
const ObjectId = require('mongoose').Types.ObjectId;
let UserService = class UserService {
    constructor(userRepository, roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    async create(userDto) {
        const { name, lastName, phone, email, role } = userDto;
        const dataRole = await this.roleService.findByCondition(role);
        if (!dataRole)
            throw new common_1.NotFoundException('role not exist');
        const role_id = dataRole['_id'].toString();
        const password = await (0, encryption_1.encryption)(userDto.password);
        return await this.userRepository.create({
            name,
            lastName,
            phone,
            email,
            password,
            role_id,
        });
    }
    async findAll() {
        return this.userRepository.findAll();
    }
    async findById(id) {
        return this.userRepository.findById(id);
    }
    async update(userDto, id) {
        if (userDto.password)
            userDto.password = await (0, encryption_1.encryption)(userDto.password);
        return this.userRepository.update(userDto, { _id: id });
    }
    async findByCondition(email) {
        return await this.userRepository.findByCondition({ email: email });
    }
    async findByConditionRelation(email, relation) {
        return await this.userRepository.findByConditionRelation({ email: email }, relation);
    }
    async delete(id) {
        return this.userRepository.delete(id);
    }
    async findByConditionRelationAgregate(relation) {
        return this.userRepository.findByConditionRelationAgregate(relation);
    }
    async commerceList(id) {
        var _a;
        const commerceVisitados = await this.findByConditionRelationAgregate([
            {
                $match: {
                    _id: ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: 'transactions',
                    pipeline: [
                        { $match: { user_id: ObjectId(id) } },
                        {
                            $group: {
                                _id: {
                                    commerce_id: '$commerce_id',
                                    user_id: '$user_id',
                                },
                                creation: { $push: '$creation' },
                            },
                        },
                    ],
                    as: 'transactions',
                },
            },
            { $sort: { 'transactions.creation': -1 } },
            {
                $project: {
                    _id: 0,
                    commerce: {
                        $map: {
                            input: '$transactions',
                            as: 'data',
                            in: {
                                _id: '$$data._id.commerce_id',
                                creation: { $arrayElemAt: ['$$data.creation', 0] },
                            },
                        },
                    },
                },
            },
        ]);
        const commerce = [];
        if ((_a = commerceVisitados[0]) === null || _a === void 0 ? void 0 : _a.commerce)
            commerceVisitados[0].commerce.forEach((element) => {
                commerce.push(element._id);
            });
        const commerceNotVisitados = await this.findByConditionRelationAgregate([
            {
                $match: {
                    _id: ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: 'commerces',
                    pipeline: [{ $match: { _id: { $nin: commerce } } }],
                    as: 'commerce',
                },
            },
            {
                $lookup: {
                    from: 'commerces',
                    pipeline: [{ $match: { _id: { $in: commerce } } }],
                    as: 'commercenotVisitado',
                },
            },
            {
                $project: {
                    _id: 0,
                    commercevisitate: {
                        $map: {
                            input: '$commercenotVisitado',
                            as: 'data',
                            in: {
                                _id: '$$data._id',
                                name: '$$data.name',
                                maxDiscountAmount: '$$data.maxDiscountAmount',
                                discount: '$$data.discount',
                            },
                        },
                    },
                    commercenotVisitate: {
                        $map: {
                            input: '$commerce',
                            as: 'data',
                            in: {
                                _id: '$$data._id',
                                name: '$$data.name',
                                maxDiscountAmount: '$$data.maxDiscountAmount',
                                discount: '$$data.discount',
                            },
                        },
                    },
                },
            },
        ]);
        return commerceNotVisitados[0];
    }
    async commercefindUser(filter, commerce_id) {
        const commerceVisitados = await this.findByConditionRelationAgregate([
            {
                $match: {
                    phone: filter,
                },
            },
            {
                $lookup: {
                    from: 'transactions',
                    let: { order_item: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$user_id', '$$order_item'] },
                                        { $eq: ['$commerce_id', ObjectId(commerce_id)] },
                                    ],
                                },
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
                                count: { $sum: 1 },
                            },
                        },
                    ],
                    as: 'statistics',
                },
            },
            {
                $lookup: {
                    from: 'transactions',
                    let: { order_item: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$user_id', '$$order_item'] },
                                        { $eq: ['$commerce_id', ObjectId(commerce_id)] },
                                    ],
                                },
                                commerce_id: ObjectId(commerce_id),
                            },
                        },
                    ],
                    as: 'transactions',
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
                                            $eq: ['$$discounts.user_id', '$$order_item'],
                                        },
                                    },
                                },
                                usediscounts: {
                                    $filter: {
                                        input: '$discounts',
                                        as: 'discounts',
                                        cond: {
                                            $and: [
                                                { $eq: ['$$discounts.user_id', '$$order_item'] },
                                                { $eq: ['$$discounts.status', false] },
                                            ],
                                        },
                                    },
                                },
                                notUsediscounts: {
                                    $filter: {
                                        input: '$discounts',
                                        as: 'discounts',
                                        cond: {
                                            $and: [
                                                { $eq: ['$$discounts.user_id', '$$order_item'] },
                                                { $eq: ['$$discounts.status', true] },
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
                    name: 1,
                    lastName: 1,
                    email: 1,
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
                                                    $subtract: ['$commerce.maxDiscountAmount', '$$neto'],
                                                },
                                                descuentoReclamable: {
                                                    $divide: ['$$neto', '$commerce.maxDiscountAmount'],
                                                },
                                            },
                                        },
                                    },
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
        return commerceVisitados[0];
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('userRepositoryInterface')),
    __param(1, (0, common_1.Inject)('roleServiceInterface')),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map