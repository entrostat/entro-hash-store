import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { LoggerService } from './logger.service';

@Controller('hash')
@UseGuards(AuthGuard)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService,
  ) {}

  @Get(':key/value/:value')
  async setValueByGetRequest(
    @Param('key') key: string,
    @Param('value') value: string,
  ) {
    this.logger.info(`Setting ${key} to ${value}`);
    return this.appService.set(key, value);
  }

  @Get(':key')
  async getValue(@Param('key') key: string) {
    const value = await this.appService.get(key);
    this.logger.info(`Retrieved ${key} returned ${value}`);
    return value;
  }
}
