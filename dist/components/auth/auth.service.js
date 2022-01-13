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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const relations_1 = require("../../common/constants/relations");
const encryption_1 = require("../../common/encryption");
const agregate_1 = require("../../common/inquiries/agregate");
const ObjectId = require('mongoose').Types.ObjectId;
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async autentification(data) {
        var _a;
        const user = await this.userService.findByConditionRelationAgregate((0, agregate_1.filterQueryReverse)('commerces', { userId: '$_id' }, ['$manager', '$$userId'], 'commerce', { email: data.email }, {
            from: 'roles',
            localField: relations_1.Relations.role,
            foreignField: '_id',
            as: 'role',
        }));
        if (user.length === 0) {
            throw new common_1.NotFoundException('user not exist');
        }
        const match = await (0, encryption_1.isMatch)(data.password, user[0].password);
        if (match) {
            if (((_a = user[0]['role'][0]) === null || _a === void 0 ? void 0 : _a.slug) === 'user.empleado' &&
                !user[0]['commerce'][0])
                throw new common_1.NotAcceptableException('user empleado sin comercio');
            return user[0];
        }
        throw null;
    }
    async login(user) {
        var _a, _b;
        const playload = {
            id: user._id.toString(),
            role_slug: (_a = user.role[0]) === null || _a === void 0 ? void 0 : _a.slug,
            commerce_id: (_b = user.commerce[0]) === null || _b === void 0 ? void 0 : _b._id.toString(),
        };
        return {
            access_token: this.jwtService.sign(playload),
        };
    }
    async porfileUser(id) {
        return await this.userService.findByConditionRelationAgregate([
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
                    as: 'transactions',
                },
            },
            {
                $lookup: {
                    from: 'transactions',
                    pipeline: [
                        { $match: { user_id: ObjectId(id) } },
                        {
                            $group: {
                                _id: '$commerce_id',
                            },
                        },
                    ],
                    as: 'comerciosVisitados',
                },
            },
            {
                $project: {
                    _id: 0,
                    email: 1,
                    lastName: 1,
                    name: 1,
                    transactions: 1,
                    comerciosVisitados: {
                        $cond: {
                            if: { $isArray: '$comerciosVisitados' },
                            then: { $size: '$comerciosVisitados' },
                            else: 'NA',
                        },
                    },
                },
            },
        ]);
    }
    async porfileCommerce(id) {
        return await this.userService.findByConditionRelationAgregate([
            {
                $match: {
                    _id: ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: 'commerces',
                    pipeline: [{ $match: { manager: ObjectId(id) } }],
                    as: 'commerce',
                },
            },
            {
                $unwind: '$commerce',
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    lastName: 1,
                    email: 1,
                    commerce: {
                        _id: '$commerce._id',
                        name: '$commerce.name',
                        direction: '$commerce.direction',
                        discount: '$commerce.discount',
                        maxDiscountAmount: '$commerce.maxDiscountAmount',
                    },
                },
            },
        ]);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('userServiceInterface')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map