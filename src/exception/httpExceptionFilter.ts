import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
// 装饰@Catch(HttpException)器将所需的元数据绑定到异常过滤器，
// 告诉 Nest 这个特定的过滤器正在寻找类型的异常HttpException，
// 而不是其他任何东西
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  // 参数exception为当前正在处理的异常对象
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
