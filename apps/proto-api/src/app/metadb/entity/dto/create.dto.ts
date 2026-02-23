import {  IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntityDto {
  @ApiProperty({ description: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
