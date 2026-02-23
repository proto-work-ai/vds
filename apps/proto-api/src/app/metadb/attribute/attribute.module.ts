/* eslint-disable @nx/enforce-module-boundaries */
import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '@metadb/prisma';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { AttributeController } from './attribute.controller';
import { AttributeSevice } from './attribute.service';

@Module({
  controllers: [AttributeController],
  providers: [AttributeSevice, PrismaService],
  imports: [PrismaModule, AuthModule, UserModule],
})
export class AttributeModule {}
