import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { LoggerService } from './logger.service';
import { HealthController } from './health.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, HealthController],
  providers: [
    LoggerService,
    DatabaseService,
    AppService,
    AuthService,
    AuthGuard,
  ],
})
export class AppModule {}
