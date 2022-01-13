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
exports.CommerceSchema = exports.Commerce = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let Commerce = class Commerce {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Commerce.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Commerce.prototype, "province", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Commerce.prototype, "direction", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
    }),
    __metadata("design:type", String)
], Commerce.prototype, "cif", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Commerce.prototype, "maxDiscountAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Commerce.prototype, "discount", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)([
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            amount: { type: Number },
            maxDiscountAmount: { type: Number },
            status: { type: Boolean },
        },
    ])),
    __metadata("design:type", Array)
], Commerce.prototype, "discounts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", String)
], Commerce.prototype, "manager", void 0);
Commerce = __decorate([
    (0, mongoose_1.Schema)()
], Commerce);
exports.Commerce = Commerce;
exports.CommerceSchema = mongoose_1.SchemaFactory.createForClass(Commerce);
//# sourceMappingURL=commerce.shema.js.map