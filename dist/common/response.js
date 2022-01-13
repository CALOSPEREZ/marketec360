"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginResponse = exports.handleResponse = void 0;
const handleResponse = (res, statusCode, message = 'ok', data = null) => {
    return res.status(statusCode).send({
        message,
        data,
    });
};
exports.handleResponse = handleResponse;
const loginResponse = (data) => {
    return {
        message: 'ok',
        data: {
            token: data.token,
            name: data.user.name,
            lastName: data.user.lastName,
            role: data.user.role_id.value,
        },
    };
};
exports.loginResponse = loginResponse;
//# sourceMappingURL=response.js.map