import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { ApiResponse, api } from '../utils/response.util';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
      return next.handle().pipe(
        map((data) => {
          // Nếu data đã là ApiResponse (từ service), trả về nguyên
          if (data && typeof data === 'object' && 'success' in data && 'message' in data && 'response' in data) {
            return data;
          }
          // Gói dữ liệu vào ApiResponse
          return api<T>()
            .setResponse(data)
            .build();
        }),
      );
    }
  }