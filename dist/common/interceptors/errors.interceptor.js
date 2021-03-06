"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const responseMessage = (type, message) => {
            response.status(status).json({
                statusCode: status,
                path: request.url,
                errorType: type,
                errorMessage: message,
            });
        };
        switch (exception.name) {
            case 'MongoServerError': {
                switch (exception['code']) {
                    case 11000: {
                        responseMessage(exception.name, `Dato duplicado ${Object.keys(exception['keyValue'])}`);
                        break;
                    }
                }
                break;
            }
            case 'ValidationError': {
                responseMessage(exception.name, exception);
                break;
            }
            default: {
                responseMessage(exception.name, exception
                    ? exception['response']
                        ? exception['response']
                        : exception.stack
                            ? exception.stack
                            : exception
                    : exception);
                break;
            }
        }
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=errors.interceptor.js.map