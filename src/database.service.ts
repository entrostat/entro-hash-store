import { Injectable, OnModuleInit } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs-extra';
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
      const dbPath = path.resolve('./database.sqlite');
      this.logger.info(
        `Database ${
          fs.existsSync(dbPath) ? 'EXISTS' : 'DOES NOT EXIST'
        } at ${dbPath}`,
      );
      const db = fs.existsSync(dbPath)
        ? await this.openDatabase(dbPath)
        : await this.createDatabase(dbPath);
      this.database = await db;
      this.logger.info(
        `The database has been opened successfully`,
        this.database,
      );
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  private async openDatabase(dbPath: string) {
    return open({
      filename: dbPath,
      driver: sqlite.Database,
    });
  }

  private async createDatabase(dbPath: string) {
    this.logger.info(`Create a new database at ${dbPath}`);
    await fs.writeFile(dbPath, '');
    await this.openDatabase(dbPath).then(async (db) => {
      await db.exec(
        `CREATE TABLE key_values (key TEXT PRIMARY KEY, value TEXT)`,
      );
      await db.exec(`CREATE TABLE tokens (token TEXT PRIMARY KEY)`);
      const initToken = uuid().toString();
      await db.exec(`INSERT INTO tokens VALUES ('${initToken}')`);
      this.logger.info(`Created the initial token\n\n\n${initToken}\n\n`);
    });
    return this.openDatabase(dbPath);
  }

  getDatabaseInstance() {
    return this.database;
  }
}
