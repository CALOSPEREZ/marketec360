"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatch = exports.encryption = void 0;
const bcrypt = require("bcrypt");
const settings_1 = require("./constants/settings");
const encryption = async (dato) => {
    return await bcrypt.hash(dato, settings_1.config.round);
};
exports.encryption = encryption;
const isMatch = async (dato, isMatch) => {
    const result = await bcrypt.compare(dato, isMatch);
    return result;
};
exports.isMatch = isMatch;
//# sourceMappingURL=encryption.js.map