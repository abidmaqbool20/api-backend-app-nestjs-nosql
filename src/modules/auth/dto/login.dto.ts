import { IsString, IsEmail  } from 'class-validator';
export class LoginDto {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
