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
exports.UserIdMiddleware = void 0;
const common_1 = require("@nestjs/common");
const user_service_interface_1 = require("../components/user/interface/user.service.interface");
let UserIdMiddleware = class UserIdMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        const result = await this.userService.findById(req.body.user_id);
        next();
    }
};
UserIdMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('userServiceInterface')),
    __metadata("design:paramtypes", [Object])
], UserIdMiddleware);
exports.UserIdMiddleware = UserIdMiddleware;
//# sourceMappingURL=findById.middleware.js.map