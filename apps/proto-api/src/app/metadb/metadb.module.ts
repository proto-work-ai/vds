import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from '../app/metadb/prisma/prisma.service';
import { SeedService } from './seeder/seed.service';
import { EntityModule } from './entity';
import { AttributeModule } from './attribute';
import { EntryModule } from './entry';
import { MediaModule } from './media';

@Module({
  imports: [
    AuthModule,
    UserModule,

    // RoleModule,
    // UserRoleModule,
    // PermissionModule,
    // RolePermissionModule,
    // UserPermissionModule,

    EntityModule,
    AttributeModule,
    EntryModule,
    MediaModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'browser'), // prod
    }),
  ],
  controllers: [],
  providers: [PrismaService, SeedService]
})
export class AppModule {}
