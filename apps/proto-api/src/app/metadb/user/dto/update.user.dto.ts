import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'user email' })
  @IsOptional()
  @IsString()
  email?: string;
  

  @ApiProperty({ description: 'user password' })
  @IsOptional()
  @IsString()
  password?:string;

  @ApiProperty({ description: 'user name' })
  @IsOptional()
  @IsString()
  name?:string;
}
