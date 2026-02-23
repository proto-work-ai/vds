import {  IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Entry } from '@prisma/client';

export interface CreateEntryDto extends Entry {}
