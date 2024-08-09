import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@/modules/auth/auth.service'; 
import { AuthController } from '@/modules/auth/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '@/modules/users/users.module';
import { UsersService } from '@/modules/users/users.service';
import { UsersRepository } from '@/modules/users/users.repository';
import { CustomLoggerService } from '@/logger/logger.service'; 
import { AuthRepository } from '@/modules/auth/auth.repository';
import { CacheService } from '@/cache/node.cache';
import { LoggerModule } from '@/logger/logger.module';
import { TokenService } from './token.service';
import { ResponseService } from '@/global/response.service';
import { CacheKeysService } from '@/global/cache-keys.service';

@Module({
  imports: [
    LoggerModule,
    UsersModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'aY1le56893WRjtAQyzMemUUq3RfreGYJY1iL', 
      signOptions: { algorithm: 'HS256' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService, UsersRepository, CustomLoggerService, AuthRepository, CacheService, TokenService, ResponseService, CacheKeysService,
    {
      provide: CacheKeysService,
      useFactory: () => new CacheKeysService('auth'),
    },
  ],
  controllers: [AuthController]
})
export class AuthModule {}
