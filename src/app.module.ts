import { Module, MiddlewareConsumer, OnModuleInit } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module'; 
import { AuthModule } from './modules/auth/auth.module'; 
import { loadDatabaseModule } from './db/db-loader';
import { LoggerModule } from './logger/logger.module'; 
import { rateLimiterConfig } from '@/config/rate-limiter.config';
import { RateLimiterModule, RateLimiterGuard } from 'nestjs-rate-limiter';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';  
import { PassportModule } from '@nestjs/passport';  
import { CacheService } from '@/cache/node.cache'; 
import { ResponseService } from '@/global/response.service'; 

@Module({
  imports: [  
    RateLimiterModule.register(rateLimiterConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule, 
    UsersModule,
    LoggerModule, 
    
  ],
  controllers: [AppController],
  providers: [ 
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
    CacheService,
    ResponseService 
  ], 
  exports: [CacheService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    try {
      const DBModule = await loadDatabaseModule(); 
    } catch (error) {
      console.error('Error loading the database module:', error);
    }
  }  
}
