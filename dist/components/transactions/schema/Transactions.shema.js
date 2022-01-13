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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsSchema = exports.Transactions = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let Transactions = class Transactions {
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commerce',
    }),
    __metadata("design:type", String)
], Transactions.prototype, "commerce_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", String)
], Transactions.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Transactions.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Transactions.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: Date.now,
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "creation", void 0);
Transactions = __decorate([
    (0, mongoose_1.Schema)()
], Transactions);
exports.Transactions = Transactions;
exports.TransactionsSchema = mongoose_1.SchemaFactory.createForClass(Transactions);
//# sourceMappingURL=Transactions.shema.js.map