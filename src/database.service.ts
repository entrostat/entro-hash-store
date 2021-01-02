import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sqlite from 'sqlite3';
import { open, Database } from 'sqlite';
import { v4 as uuid } from 'uuid';
import { LoggerService } from './logger.service';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private database: Database;

  constructor(private readonly logger: LoggerService) {}

  async onModuleInit() {
    try {
      const db = await this.createDatabase();
      this.database = await db;
      this.logger.info(
        `The database has been opened successfully`,
        this.database,
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  private async openDatabase() {
    return open({
      filename: ':memory:',
      driver: sqlite.Database,
    });
  }

  private async createDatabase() {
    this.logger.info(`Create a new database at :memory:`);
    await this.openDatabase().then(async (db) => {
      await db.exec(
        `CREATE TABLE key_values (key TEXT PRIMARY KEY, value TEXT)`,
      );
      await db.exec(`CREATE TABLE tokens (token TEXT PRIMARY KEY)`);
      const initToken = uuid().toString();
      await db.exec(`INSERT INTO tokens VALUES ('${initToken}')`);
      this.logger.info(`Created the initial token\n\n\n${initToken}\n\n`);
    });
    return this.openDatabase();
  }

  getDatabaseInstance() {
    return this.database;
  }
}
