import { IsNumber, IsOptional,  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoleDto {
  @ApiProperty({ description: 'roleId' })
  @IsOptional()
  @IsNumber()
  userId?: string;

  @ApiProperty({ description: 'permissionId' })
  @IsOptional()
  @IsNumber()
  roleId?: string;
}