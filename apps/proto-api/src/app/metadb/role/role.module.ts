/* eslint-disable @nx/enforce-module-boundaries */
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { PrismaModule, PrismaService } from '@metadb/prisma';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [PrismaModule, AuthModule, UserModule],
})
export class RoleModule {}
