import { PartialType } from '@nestjs/mapped-types';
import { CreateDto } from './create.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsDate } from 'class-validator';

export class UpdateDto extends PartialType(CreateDto) {

  @ApiProperty({ description: 'The name of the user', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'The email of the user', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'The password of the user', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: 'The creation date of the user', required: false })
  @IsOptional()
  @IsDate()
  created_at?: Date;

  @ApiProperty({ description: 'The last update date of the user', required: false })
  @IsOptional()
  @IsDate()
  updated_at?: Date;
}
