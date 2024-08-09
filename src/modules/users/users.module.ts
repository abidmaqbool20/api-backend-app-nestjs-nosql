import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerModule } from '@/logger/logger.module';
import { UsersRepository } from './users.repository'; 
import { CacheService } from '@/cache/node.cache';
import { ResponseService } from '@/global/response.service';
import { CacheKeysService } from '@/global/cache-keys.service';

@Module({
  imports: [LoggerModule],   
  providers: [
    UsersService,UsersRepository,CacheService, ResponseService,  
    {
      provide: CacheKeysService,
      useFactory: () => new CacheKeysService('users'),
    },
  ],   
  controllers: [UsersController],
})
export class UsersModule {}
