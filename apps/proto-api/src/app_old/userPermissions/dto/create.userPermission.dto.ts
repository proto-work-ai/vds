import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserPermissionDto {
  @ApiProperty({ description: 'userId' })
  @IsNumber()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'permissionId' })
  @IsNumber()
  @IsNotEmpty()
  permissionId: string;
}
