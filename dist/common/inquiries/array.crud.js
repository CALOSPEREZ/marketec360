"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amountDiscount = exports.countDiscount = void 0;
const countDiscount = (data, count) => {
    data.forEach((element) => {
        element.discounts.forEach((result) => {
            if (!result.status)
                count++;
        });
    });
    return count;
};
exports.countDiscount = countDiscount;
const amountDiscount = (data, count) => {
    data.forEach((element) => {
        element.discounts.forEach((result) => {
            if (result.status)
                count += result.amount;
        });
    });
    return count;
};
exports.amountDiscount = amountDiscount;
//# sourceMappingURL=array.crud.js.map