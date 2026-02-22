import { Controller, Get } from '@nestjs/common';
import { IMetaDbEntity } from '@metadb/model';
import { AppService } from '../app.service';

@Controller({ path: 'entity' })
export class EntityController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return [
      {
        name: 'first_name',
      },
      {
        name: 'last_name',
      },
      {
        name: 'email_address',
      },
      {
        name: 'phone_number',
      },
      {
        name: 'created_by',
      },
      {
        name: 'updated_at',
      },
      {
        name: 'record_status',
      },
    ] satisfies IMetaDbEntity[];
  }
}
