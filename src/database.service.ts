import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as sqlite from 'sqlite3';
import { open, Database } from 'sqlite';
@Injectable()
export class DatabaseService {
  private database: Database;
  async onModuleInit() {
    try {
      const dbPath = path.resolve('./database.sqlite');
      console.log(
        `Database ${
          fs.existsSync(dbPath) ? 'EXISTS' : 'DOES NOT EXIST'
        } at ${dbPath}`,
      );
      const db = fs.existsSync(dbPath)
        ? await this.openDatabase(dbPath)
        : await this.createDatabase(dbPath);
      this.database = await db;
      console.log(`The database has been opened successfully`, this.database);
    } catch (e) {
      console.error(e.message);
    }
  }

  private async openDatabase(dbPath: string) {
    return open({
      filename: dbPath,
      driver: sqlite.Database,
    });
  }

  private async createDatabase(dbPath: string) {
    console.log(`Create a new database at ${dbPath}`);
    await fs.writeFile(dbPath, '');
    await this.openDatabase(dbPath).then(async (db) => {
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
