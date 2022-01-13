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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const agregate_1 = require("../../common/inquiries/agregate");
const response_1 = require("../../common/response");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_user_dto_1 = require("./dto/create.user.dto");
const update_user_dto_1 = require("./dto/update.user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll(res) {
        const data = await this.userService.findByConditionRelationAgregate((0, agregate_1.filterQuery)('roles', 'role_id', '_id', 'Role', '$Role', {
            'Role.slug': 'user.empleado',
        }));
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.ACCEPTED, 'ok', data);
    }
    async first(id, res) {
        const data = await this.userService.findById(id);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.ACCEPTED, 'ok', data);
    }
    async commerces(req, res) {
        const data = await this.userService.commerceList(req.user.id);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.ACCEPTED, 'ok', data);
    }
    async commercesfindUser(filter, req, res) {
        const data = await this.userService.commercefindUser(filter, req.user.commerce_id);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.ACCEPTED, 'ok', data);
    }
    async create(userDto, res) {
        const data = await this.userService.create(userDto);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.CREATED, 'ok', data);
    }
    async update(userDto, id, res) {
        const data = await this.userService.update(userDto, id);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.ACCEPTED, 'ok', data);
    }
    async delete(id, res) {
        const data = await this.userService.delete(id);
        return (0, response_1.handleResponse)(res, common_1.HttpStatus.ACCEPTED, 'ok', data);
    }
    async login(email) {
        const t = await this.userService.findByCondition(email);
        return t;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "first", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('commerces/list'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "commerces", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('commerces/user/:filter'),
    __param(0, (0, common_1.Param)('filter')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "commercesfindUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __param(0, (0, common_1.Inject)('userServiceInterface')),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map