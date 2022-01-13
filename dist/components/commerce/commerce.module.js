"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommerceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const commer_repository_1 = require("../../repositories/commer.repository");
const commerce_controller_1 = require("./commerce.controller");
const commerce_service_1 = require("./commerce.service");
const commerce_shema_1 = require("./schema/commerce.shema");
let CommerceModule = class CommerceModule {
};
CommerceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Commerce', schema: commerce_shema_1.CommerceSchema }]),
        ],
        providers: [
            {
                provide: 'CommerceRepositoryInterface',
                useClass: commer_repository_1.CommerceRepository,
            },
            {
                provide: 'commerceServiceInterface',
                useClass: commerce_service_1.CommerceService,
            },
        ],
        controllers: [commerce_controller_1.CommerceController],
        exports: [{ provide: 'commerceServiceInterface', useClass: commerce_service_1.CommerceService }],
    })
], CommerceModule);
exports.CommerceModule = CommerceModule;
//# sourceMappingURL=commerce.module.js.map