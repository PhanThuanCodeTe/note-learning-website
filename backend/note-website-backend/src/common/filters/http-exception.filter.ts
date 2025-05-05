import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { api } from '../utils/response.util';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      const error = exception.getResponse();
  
      response.status(status).json(
        api()
          .setError(
            typeof error === 'string' ? error : (error as any).message,
            error,
          )
          .build(),
      );
    }
  }