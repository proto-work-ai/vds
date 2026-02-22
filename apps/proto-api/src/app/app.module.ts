import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { metadbApi } from './metadb';

@Module({
  controllers: [...metadbApi],
  imports: [],
  providers: [AppService],
})
export class AppModule {}
