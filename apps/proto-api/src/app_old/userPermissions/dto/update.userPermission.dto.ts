import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPermissionDto {
  @ApiProperty({ description: 'userId' })
  @IsOptional()
  @IsNumber()
  userId?: string;

  @ApiProperty({ description: 'permissionId' })
  @IsOptional()
  @IsNumber()
  permissionId?: string;
}
