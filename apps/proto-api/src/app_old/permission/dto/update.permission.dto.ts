import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto {
  @ApiProperty({ description: 'name' })
  @IsOptional()
  @IsString()
  name?: string;
}
