import {  IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttributeDto {
  @ApiProperty({ description: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;
  type: string;
  required: boolean;
  description: string;
  default: string;
  title: string;
  id: string;
  readonly: boolean;
  order: number;
  disable: boolean;
  hash: string;
  role: number;
  security: boolean;
  field: string;
  relationId: string;
  relationName: string;
  //relationMultiple: boolean;
  createdAt: Date;
  updatedAt: Date;
  entityId: string;
}
