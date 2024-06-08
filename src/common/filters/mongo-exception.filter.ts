import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, HttpException, InternalServerErrorException } from "@nestjs/common";
import { Response  } from "express";
import { MongoError } from "mongodb";

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let httpException: HttpException;

    switch(exception.code) {
      case 11000:
        httpException = new ConflictException('Duplicate key error: An item with the same value already exists.');
        break;
      default: 
      httpException = new InternalServerErrorException('Internal server error');
      break;
    }

    const status = httpException.getStatus();

    const errorResponse = {
      statusCode: status,
      message: httpException.message,
    };

    response.status(status).json(errorResponse);
  }
}