import { Controller, Get } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('health')
export class HealthController {
  constructor(private readonly logger: LoggerService) {}

  @Get()
  async health() {
    this.logger.debug(`Health check, returning 200`);
    return `hello world`;
  }
}
