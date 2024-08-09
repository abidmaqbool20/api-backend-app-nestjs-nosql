import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service'; 
import { GeneralHelper } from '@/helpers/general.helper'
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { RegisterUserDto } from '@/modules/auth/dto/register.dto';  
import { AuthRepository } from '@/modules/auth/auth.repository';
@Injectable()
export class AuthService {
  constructor( 
    private readonly authRepository: AuthRepository, 
  ) {}
  
  async login(data: LoginDto) { 
    return this.authRepository.login(data);
  }

  async register(data: RegisterUserDto) { 
    return this.authRepository.register(data);
  }

  async logout(token : string, data : any) { 
    return this.authRepository.logout(token, data);
  }
 

 
}
