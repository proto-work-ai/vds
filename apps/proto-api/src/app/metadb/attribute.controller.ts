import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller({ path: 'attribute' })
export class AttributeController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return [
      'User',
      'last_name',
      'Product',
      'Invoice',
      'Power usage',
      'Living Room Light',
    ];
  }
}