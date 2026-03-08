/* eslint-disable @nx/enforce-module-boundaries */
import { Module } from '@nestjs/common';
import { PrismaModule } from '@metadb/prisma';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  controllers: [RecordController],
  providers: [RecordService],
  imports: [PrismaModule, AuthModule, UserModule],
})
export class RecordModule {}
