import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':key/value/:value')
  async setValueByGetRequest(
    @Param('key') key: string,
    @Param('value') value: string,
  ) {
    console.log(`Setting ${key} to ${value}`);
    return this.appService.set(key, value);
  }

  @Get(':key')
  async getValue(@Param('key') key: string) {
    const value = await this.appService.get(key);
    console.log(`Retrieved ${key} returned ${value}`);
    return value;
  }
}
