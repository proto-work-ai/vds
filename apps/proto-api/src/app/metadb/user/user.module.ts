import { Module, forwardRef } from '@nestjs/common';
import { EntryService } from 'src/entry/entry.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [PrismaModule, AuthModule],
  providers: [UserService, EntryService],
  exports: [UserService]
})
export class UserModule { }
