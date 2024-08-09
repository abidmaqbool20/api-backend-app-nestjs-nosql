import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { CustomLoggerService } from '@/logger/logger.service';  

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Extract message from exception response
    const message = typeof exceptionResponse === 'string'
      ? exceptionResponse
      : (exceptionResponse as any).message || 'Unknown error';

    // Log the exception details
    // this.logger.error(`HTTP Exception: ${message}`, {
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: ctx.getRequest().url,
    //   stack: exception.stack,
    // });

    // Send the response to the client
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
