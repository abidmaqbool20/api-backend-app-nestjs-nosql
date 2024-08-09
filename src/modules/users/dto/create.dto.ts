import { IsOptional, IsString, IsEmail, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDto { 

  @IsOptional()
  @IsString()
  id: string;


  @ApiProperty({ description: 'The name of the user' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsOptional()
  @IsString()
  password: string;

  
  @IsOptional()
  @IsDate()
  created_at: Date;

  @IsOptional()
  @IsDate()
  updated_at: Date;
}
