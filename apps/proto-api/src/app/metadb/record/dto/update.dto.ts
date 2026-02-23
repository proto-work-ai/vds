import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Entry } from '@prisma/client';

export interface UpdateEntryDto extends Entry {}
