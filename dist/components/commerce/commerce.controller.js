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
exports.CommerceController = void 0;
const common_1 = require("@nestjs/common");
const response_1 = require("../../common/response");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_commerce_dto_1 = require("./dto/create.commerce.dto");
const discount_dto_1 = require("./dto/discount.dto");
const discount_updatedto_dto_1 = require("./dto/discount.updatedto.dto");
let CommerceController = class CommerceController {
    constructor(custommerService) {
        this.custommerService = custommerService;
    }
    async create(custommerDto, res) {
        const data = await this.custommerService.create(custommerDto);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async discount(custommerDto, id, res) {
        const data = await this.custommerService.discount(custommerDto, id);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async updateDiscount(custommerDto, id, res) {
        const data = await this.custommerService.updateDiscount(id, custommerDto);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async deleteDiscount(param, res) {
        const data = await this.custommerService.deleteDiscount(param['id'], param['comid']);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async commerce(commerce_id, req, res) {
        const data = await this.custommerService.statistics(req.user.id, commerce_id);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async findAll(res) {
        const data = await this.custommerService.findAll();
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async findById(id, res) {
        const data = await this.custommerService.findById(id);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async update(commercedto, id, res) {
        const data = await this.custommerService.update(commercedto, { _id: id });
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async delete(id, res) {
        const data = await this.custommerService.delete(id);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_commerce_dto_1.CreateCommerceDto, Object]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('discount/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_dto_1.DiscountDto, String, Object]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "discount", null);
__decorate([
    (0, common_1.Put)('discount/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discount_updatedto_dto_1.DiscountUpdateDto, String, Object]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "updateDiscount", null);
__decorate([
    (0, common_1.Delete)(':comid/discount/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "deleteDiscount", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':commerce_id/user'),
    __param(0, (0, common_1.Param)('commerce_id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "commerce", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_commerce_dto_1.CreateCommerceDto, String, Object]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommerceController.prototype, "delete", null);
CommerceController = __decorate([
    (0, common_1.Controller)('commerce'),
    __param(0, (0, common_1.Inject)('commerceServiceInterface')),
    __metadata("design:paramtypes", [Object])
], CommerceController);
exports.CommerceController = CommerceController;
//# sourceMappingURL=commerce.controller.js.map