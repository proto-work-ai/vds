/* eslint-disable @nx/enforce-module-boundaries */
import { Module } from '@nestjs/common';
import { PrismaModule } from '@metadb/prisma';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

import { EntryController } from './record.controller';
import { EntryService } from './record.service';

@Module({
  controllers: [EntryController],
  providers: [EntryService],
  imports: [PrismaModule, AuthModule, UserModule],
})
export class RecordModule {}
