import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { QueryDto } from './kafka/query.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query() query:QueryDto): string {
    return this.appService.getHello(query);
  }
}
