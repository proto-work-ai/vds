import { Module } from '@nestjs/common';
import { EntryService } from 'src/entry';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, PrismaService, EntryService],
  imports: [PrismaModule, AuthModule, UserModule]
})
export class MediaModule {}
