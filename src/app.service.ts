import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class AppService {
  constructor(private databaseService: DatabaseService) {}

  async set(key: string, value: string) {
    const exists = await this.get(key);
    return exists
      ? this.databaseService
          .getDatabaseInstance()
          .run(`UPDATE key_values SET value = ? WHERE key = ?`, [value, key])
      : this.databaseService
          .getDatabaseInstance()
          .run(`INSERT INTO key_values (key, value) VALUES (?, ?)`, [
            key,
            value,
          ]);
  }

  async get(key: string) {
    return this.databaseService
      .getDatabaseInstance()
      .get(`SELECT value FROM key_values WHERE key = ?`, key)
      .then((result) => result?.value);
  }
}
