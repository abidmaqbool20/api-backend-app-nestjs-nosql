import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { GeneralHelper } from '@/helpers/general.helper'
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { RegisterUserDto } from '@/modules/auth/dto/register.dto';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { CustomLoggerService } from '@/logger/logger.service';
import { User } from '@/modules/users/entities/user.entity';
import { DatabaseService } from '@/db/db.service.interface';
import { DatabaseServiceFactory } from '@/db/db-service.factory';  
import { TokenService } from '@/modules/auth/token.service';

@Injectable()
export class AuthRepository implements OnModuleInit {

  private readonly tableName = 'users';  
  private dbService: DatabaseService;

  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: CustomLoggerService, 
  ) {}

  async onModuleInit() {
    this.dbService = await DatabaseServiceFactory.createService(); 
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username); 
    return user;
    let loginPassword = await GeneralHelper.encrypt(password, 'bcrypt');  
    if (user && user.password === loginPassword) {  
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: LoginDto) {  
    
    const user = await this.validateUser(data.username, data.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { username: user.email, sub: user.id };
    return { 
      access_token: this.jwtService.sign(payload, { expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME || '1m' }),
    };
  } 

  async register(data: RegisterUserDto) {   
    data.password = await GeneralHelper.encrypt(data.password, 'bcrypt');  
    let userData : RegisterUserDto = await User.newInstanceFromDTO(data); 
    const record: Record<string, AttributeValue> = {
      id: { S: userData.id },
      name: { S: userData.name },
      email: { S: userData.email },
      password: { S: userData.password },
      created_at: { N: userData.created_at.getTime().toString() },
      updated_at: null,  
    };

    const params = {
      TableName: this.tableName,
      Item: record,
    };  
    return this.dbService.putItem( params );
  }


  async logout(token : string, data : any) { 
    this.tokenService.addTokenToBlacklist(token);
    return true;
  }
 




}
