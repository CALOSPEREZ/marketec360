import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    /**
     * @description Exception json response
     * @param message
     */
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
            responseMessage(
              exception.name,
              `Dato duplicado ${Object.keys(exception['keyValue'])}`,
            );
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
        responseMessage(
          exception.name,
          exception
            ? exception['response']
              ? exception['response']
              : exception.stack
              ? exception.stack
              : exception
            : exception,
        );
        break;
      }
    }
  }
}
