import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { CacheService } from '@/cache/node.cache';

@Injectable()
export class GeneralHelper {

  constructor() {}

  static async getUUID(): Promise<string> {
    return await uuidv4();
  }

  static async encrypt(content: string, algorithm: string): Promise<string> {
    if (algorithm === 'bcrypt') {
      return await bcrypt.hash(content, 10);
    }
    return content;
  }

  static async unprotectedRoutes(): Promise<string[]> {
    return [
      '/auth/login',
      '/auth/register',
    ];
  }  

}
