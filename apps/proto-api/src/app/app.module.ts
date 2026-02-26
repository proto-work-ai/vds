/* eslint-disable @nx/enforce-module-boundaries */
import { Module } from '@nestjs/common';
import { AttributeModule, EntityModule, RecordModule } from './metadb';

@Module({
  controllers: [],
  imports: [AttributeModule, EntityModule, RecordModule],
  // providers: [PrismaService],
})
export class AppModule {}
