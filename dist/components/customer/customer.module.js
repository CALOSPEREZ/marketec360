"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const customer_repository_1 = require("../../repositories/customer.repository");
const user_module_1 = require("../user/user.module");
const customer_controller_1 = require("./customer.controller");
const customer_service_1 = require("./customer.service");
const customer_shema_1 = require("./schema/customer.shema");
let CustomerModule = class CustomerModule {
};
CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: customer_shema_1.Customer.name, schema: customer_shema_1.CustomerSchema },
            ]),
            user_module_1.UserModule,
        ],
        providers: [
            {
                provide: 'customerRepositoryInterface',
                useClass: customer_repository_1.CustomerRepository,
            },
            {
                provide: 'customerServiceInterface',
                useClass: customer_service_1.CustomerService,
            },
        ],
        controllers: [customer_controller_1.CustomerController],
        exports: [{ provide: 'customerServiceInterface', useClass: customer_service_1.CustomerService }],
    })
], CustomerModule);
exports.CustomerModule = CustomerModule;
//# sourceMappingURL=customer.module.js.map