import { Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import * as sqlite from 'sqlite';

@Injectable()
export class DatabaseService {
  private database: sqlite.Database;
  async onModuleInit() {
    const dbPath = path.resolve('./database.sqlite');
    this.database = fs.existsSync(dbPath)
      ? await this.openDatabase(dbPath)
      : await this.createDatabase(dbPath);
  }

  private async openDatabase(dbPath: string) {
    console.log(`Opening existing database at ${dbPath}`);
    return sqlite.open({
      filename: dbPath,
      driver: sqlite.Database,
    });
  }

  private async createDatabase(dbPath: string) {
    console.log(`Create a new database at ${dbPath}`);
    await Promise.resolve()
      .then(() =>
        sqlite.open({
          filename: dbPath,
          driver: sqlite.Database,
        }),
      )
      .then(async (db) => {
        await db.exec(
          'CREATE TABLE key_values (key TEXT PRIMARY KEY, value TEXT)',
        );
      });
    return this.openDatabase(dbPath);
  }

  getDatabaseInstance() {
    return this.database;
  }
}
