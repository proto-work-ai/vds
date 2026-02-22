import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import { IMetaDbRecord } from '@metadb/model';

@Controller({ path: 'record' })
export class RecordController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return [
      {children: []},
      {children: []},
      {children: []},
      {children: []},
      {children: []},
      {children: []},
    ] satisfies IMetaDbRecord[];
  }
}
