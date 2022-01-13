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
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const ObjectId = require('mongoose').Types.ObjectId;
const relations_1 = require("../../common/constants/relations");
const slugs_1 = require("../../common/constants/slugs");
const array_crud_1 = require("../../common/inquiries/array.crud");
const response_1 = require("../../common/response");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_transactions_dto_1 = require("./dto/create.transactions.dto");
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    async create(userDto, res, req) {
        userDto.commerce_id = req.user.commerce_id;
        if (!userDto.commerce_id)
            throw new common_1.NotAcceptableException('disponible solo para empleados de un comercio');
        const data = await this.transactionsService.create(userDto);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async findpopulateuser(res, req) {
        let relations, id;
        if (req.user.role_slug !== slugs_1.Slug.employee) {
            id = req.user.id;
            relations = relations_1.Relations.commerce;
        }
        else {
            relations = relations_1.Relations.user;
            id = req.user.commerce_id;
        }
        const data = await this.transactionsService.findByAllConditionRelation(id, relations);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async findByConditionRelationAgregate(res, req, id) {
        const data = await this.transactionsService.findByConditionRelationAgregate([
            {
                $match: {
                    user_id: ObjectId(id),
                },
            },
            {
                $group: {
                    _id: '$user_id',
                    accumulatedPurchases: { $sum: '$amount' },
                    count: { $sum: 1 },
                },
            },
            { $limit: 1 },
        ]);
        const numberComerce = await this.transactionsService.findByConditionRelationAgregate([
            {
                $match: {
                    user_id: ObjectId(id),
                },
            },
            {
                $group: {
                    _id: '$commerce_id',
                },
            },
        ]);
        const useDiscount = await this.transactionsService.useDiscount([
            {
                $match: {
                    discounts: {
                        $elemMatch: {
                            $and: [{ user_id: ObjectId(id) }],
                        },
                    },
                },
            },
            {
                $addFields: {
                    goals: {
                        $filter: {
                            input: '$discounts',
                            as: 'discounts',
                            cond: {
                                $eq: ['$$discounts.user_id', ObjectId(id)],
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    discounts: '$goals',
                },
            },
        ]);
        const count = 0;
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', {
            accumulatedPurchases: data[0]['accumulatedPurchases'] || 0,
            numberComerce: numberComerce.length,
            useDiscount: (0, array_crud_1.countDiscount)(useDiscount, count),
        });
    }
    async listDisconunt(res, req, id) {
        const data = await this.transactionsService.findByAllConditionRelation(id, 'commerce_id');
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async discount(res, req, { commerce_id, dni }) {
        const { user_id } = await this.transactionsService.filterUser({ dni: dni });
        const result = await this.transactionsService.resultAmount(user_id, commerce_id);
        const acumulate = await this.transactionsService.useDiscount([
            { $match: { _id: ObjectId(commerce_id) } },
            {
                $match: {
                    discounts: {
                        $elemMatch: {
                            $and: [{ user_id: ObjectId(user_id) }],
                        },
                    },
                },
            },
            {
                $addFields: {
                    goals: {
                        $filter: {
                            input: '$discounts',
                            as: 'discounts',
                            cond: {
                                $eq: ['$$discounts.user_id', ObjectId(user_id)],
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    maxDiscountAmount: 1,
                    discount: 1,
                    discounts: '$goals',
                },
            },
        ]);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', [
            {
                accumulatedPurchases: result['accumulatedAmount'] || 0,
                disposition: result['disponible'] || 0,
                missingForDiscount: acumulate[0]['maxDiscountAmount'] - result['disponible'] || 0,
                amountDiscount: (0, array_crud_1.amountDiscount)(acumulate, 0),
                useDiscount: (0, array_crud_1.countDiscount)(acumulate, 0),
                commerce: {
                    maxDiscountAmount: acumulate[0]['maxDiscountAmount'],
                    discount: acumulate[0]['discount'],
                },
            },
        ]);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transactions_dto_1.CreateTransactionsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findpopulateuser", null);
__decorate([
    (0, common_1.Get)('shoppingProfile/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findByConditionRelationAgregate", null);
__decorate([
    (0, common_1.Get)('all/descuentos/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "listDisconunt", null);
__decorate([
    (0, common_1.Get)('discount/custommer/:dni/commerce/:commerce_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "discount", null);
TransactionsController = __decorate([
    (0, common_1.Controller)('transactions'),
    __param(0, (0, common_1.Inject)('transactionsServiceInterface')),
    __metadata("design:paramtypes", [Object])
], TransactionsController);
exports.TransactionsController = TransactionsController;
//# sourceMappingURL=transactions.controller.js.map