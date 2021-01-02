import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as luxon from 'luxon';
const printf = winston.format.printf;
const myFormat = printf(({ level, message, timestamp }) => {
  return `[${
    timestamp ? timestamp : luxon.DateTime.local().toISO()
  }] ${level}: ${message}`;
});

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console({
          format: myFormat,
        }),
      ],
    });
  }

  error(message: string, ...meta: any[]) {
    this.logger.error(message, ...meta);
  }
  warn(message: string, ...meta: any[]) {
    this.logger.warn(message, ...meta);
  }
  help(message: string, ...meta: any[]) {
    this.logger.help(message, ...meta);
  }
  data(message: string, ...meta: any[]) {
    this.logger.data(message, ...meta);
  }
  info(message: string, ...meta: any[]) {
    this.logger.info(message, ...meta);
  }
  debug(message: string, ...meta: any[]) {
    this.logger.debug(message, ...meta);
  }
  prompt(message: string, ...meta: any[]) {
    this.logger.prompt(message, ...meta);
  }
  http(message: string, ...meta: any[]) {
    this.logger.http(message, ...meta);
  }
  verbose(message: string, ...meta: any[]) {
    this.logger.verbose(message, ...meta);
  }
  input(message: string, ...meta: any[]) {
    this.logger.input(message, ...meta);
  }
  silly(message: string, ...meta: any[]) {
    this.logger.silly(message, ...meta);
  }
  emerg(message: string, ...meta: any[]) {
    this.logger.emerg(message, ...meta);
  }
  alert(message: string, ...meta: any[]) {
    this.logger.alert(message, ...meta);
  }
  crit(message: string, ...meta: any[]) {
    this.logger.crit(message, ...meta);
  }
  warning(message: string, ...meta: any[]) {
    this.logger.warning(message, ...meta);
  }
  notice(message: string, ...meta: any[]) {
    this.logger.notice(message, ...meta);
  }
}
