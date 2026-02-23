import { Module } from '@nestjs/common';
import { AttributeModule, EntityModule, RecordModule } from './metadb';

@Module({
  controllers: [],
  imports: [AttributeModule, EntityModule, RecordModule],
  providers: [],
})
export class AppModule {}
