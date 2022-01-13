"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./components/auth/auth.module");
const customer_module_1 = require("./components/customer/customer.module");
const role_module_1 = require("./components/role/role.module");
const user_module_1 = require("./components/user/user.module");
const mongo_module_1 = require("./config/mongodb/mongo.module");
const commerce_module_1 = require("./components/commerce/commerce.module");
const transactions_module_1 = require("./components/transactions/transactions.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
                isGlobal: true,
            }),
            mongo_module_1.Mongo,
            role_module_1.RoleModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            customer_module_1.CustomerModule,
            commerce_module_1.CommerceModule,
            transactions_module_1.TransactionsModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map