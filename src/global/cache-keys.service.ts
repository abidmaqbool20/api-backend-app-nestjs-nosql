import { Injectable } from '@nestjs/common'; 

@Injectable()
export class CacheKeysService {

  constructor(private readonly module: string) {}

  getCacheKeyByMethodName(method: string, data?: any): string { 
    const moduleMethods = this.getModuleMethods(this.module);
    if (moduleMethods && typeof moduleMethods[method] === 'function') {
      return moduleMethods[method](data);
    } else {
      throw new Error(`Method ${method} not found in module ${this.module}`);
    }
  }

  private getModuleMethods(module: string): any {
    switch (module) {
      case 'auth':
        return this.auth; 
      case 'users':
        return this.users; 
      default:
        throw new Error(`Module ${module} not found`);
    }
  }

  public readonly users = {
    findOne(data?: any): string {
      return `users-${data}`;
    },
    findAll(data?: any): string {
      return 'users';
    },
    findByUsername(data?: any): string { 
      return `users-${data}`;
    }
  }

  public readonly auth = {
    
  }

  // Add more module objects as needed, similar to `users`
}
