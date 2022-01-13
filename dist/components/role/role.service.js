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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
let RoleService = class RoleService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(userDto) {
        const { slug, value } = userDto;
        return await this.userRepository.create({ slug, value });
    }
    async findAll() {
        return await this.userRepository.findAll();
    }
    async findById(id) {
        return await this.userRepository.findById(id);
    }
    async update(userDto, id) {
        const { slug, value } = userDto;
        return await this.userRepository.update({ slug, value }, { _id: id });
    }
    async delete(id) {
        return await this.userRepository.delete(id);
    }
    async findByCondition(slug) {
        return await this.userRepository.findByCondition({ slug: slug });
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('roleRepositoryInterface')),
    __metadata("design:paramtypes", [Object])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map