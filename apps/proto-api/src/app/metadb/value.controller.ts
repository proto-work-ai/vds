import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller({ path: 'value' })
export class ValueController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return [
      'first_name',
      'last_name',
      'email_address',
      'phone_number',
      'created_by',
      'updated_at',
      'record_status',
    ];
  }
}
