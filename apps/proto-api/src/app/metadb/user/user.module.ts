/* eslint-disable @nx/enforce-module-boundaries */
import { Module } from '@nestjs/common';
import { PrismaModule } from '@metadb/prisma';

import { AuthModule } from '../auth/auth.module';
import { EntryService } from '../record/record.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [PrismaModule, AuthModule],
  providers: [UserService, EntryService],
  exports: [UserService]
})
export class UserModule { }
