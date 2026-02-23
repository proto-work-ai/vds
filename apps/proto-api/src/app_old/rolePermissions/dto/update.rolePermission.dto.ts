import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolePermissionDto {
  @ApiProperty({ description: 'roleId' })
  @IsNumber()
  @IsOptional()
  roleId?: string;

  @ApiProperty({ description: 'permissionId' })
  @IsNumber()
  @IsOptional()  
  permissionId?: string;
}
