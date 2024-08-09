import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  private cache: any;

  constructor() {
    this.cache = new (require('node-cache'))();
  }

  set(key: string, value: any, ttl: number = 3600) {
    this.cache.set(key, value, ttl);
  }

  get(key: string) {
    return this.cache.get(key);
  }

  del(key: string) {
    this.cache.del(key);
  }

  has(key: string) {
    return this.cache.has(key);
  }
}
