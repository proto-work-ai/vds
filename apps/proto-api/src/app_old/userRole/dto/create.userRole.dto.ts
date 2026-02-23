import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @ApiProperty({ description: 'userId' })
  @IsNumber()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'role Id' })
  @IsNumber()
  @IsNotEmpty()
  roleId: string;
}