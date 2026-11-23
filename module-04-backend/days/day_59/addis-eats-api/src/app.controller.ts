import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ParseAreaPipe } from './common/pipes/parse-area.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Temporary Day 59 area test
  @Get('area-test')
  checkArea(@Query('area', ParseAreaPipe) area: string) {
    return {
      message: 'Delivery area accepted',
      area,
    };
  }
}
