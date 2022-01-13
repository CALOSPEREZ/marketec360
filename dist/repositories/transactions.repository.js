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
exports.TransactionsRepository = void 0;
const base_abstract_repository_1 = require("./base/base.abstract.repository");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const Transactions_shema_1 = require("../components/transactions/schema/Transactions.shema");
const transactions_repository_interface_1 = require("../components/transactions/interface/transactions.repository.interface");
let TransactionsRepository = class TransactionsRepository extends base_abstract_repository_1.BaseAbstractRepository {
    constructor(transactionsRepository) {
        super(transactionsRepository);
        this.transactionsRepository = transactionsRepository;
    }
};
TransactionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(Transactions_shema_1.Transactions.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], TransactionsRepository);
exports.TransactionsRepository = TransactionsRepository;
//# sourceMappingURL=transactions.repository.js.map