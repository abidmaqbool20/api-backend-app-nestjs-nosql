import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ResponseService {

  sendResponse(res: Response, message: string, data?: any) {
    const status = res.statusCode; // This will contain the status code set by res.status()
    
    switch (status) {
      case HttpStatus.OK:
        return this.sendSuccess(res, message || 'Successful', data);
      case HttpStatus.CREATED:
        return this.sendCreated(res, message || 'Created Successfully', data);
      case HttpStatus.BAD_REQUEST:
        return this.sendBadRequest(res, message || 'Unsuccessful', data);
      case HttpStatus.UNAUTHORIZED:
        return this.sendUnauthorized(res, message || 'Unauthorized');
      case HttpStatus.FORBIDDEN:
        return this.sendForbidden(res, message || 'This action is forbidden');
      case HttpStatus.NOT_FOUND:
        return this.sendNotFound(res, message || 'Not found!');
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return this.sendInternalError(res, message || 'Error occurred.', data);
      default:
        return res.status(status).json({ message: message || 'Response' });
    }
  }

  sendSuccess(res: Response, message: string, data?: any) {
    return res.status(HttpStatus.OK).json({ message, data });
  }

  sendCreated(res: Response, message: string, data?: any) {
    return res.status(HttpStatus.CREATED).json({ message, data });
  }

  sendBadRequest(res: Response, message: string, errors?: any) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message, errors });
  }

  sendUnauthorized(res: Response, message: string) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message });
  }

  sendForbidden(res: Response, message: string) {
    return res.status(HttpStatus.FORBIDDEN).json({ message });
  }

  sendNotFound(res: Response, message: string) {
    return res.status(HttpStatus.NOT_FOUND).json({ message });
  }

  sendInternalError(res: Response, message: string, error?: any) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message, error });
  }
}
