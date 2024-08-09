import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GetDto {

  @ApiProperty({ description: 'The ID of the user' })
  @IsNotEmpty()
  id: string;
}
