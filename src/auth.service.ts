import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { isNil } from 'lodash';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService) {}

  async tokenExists(token: string) {
    const foundToken = await this.databaseService
      .getDatabaseInstance()
      .get(`SELECT * FROM tokens WHERE token = ?`, token)
      .then((result) => result?.token);
    return !isNil(foundToken);
  }

  async create() {
    const token = uuid().toString();
    await this.databaseService
      .getDatabaseInstance()
      .exec(`INSERT INTO tokens VALUES ('${token}')`);
    return { token };
  }

  async delete(token: string) {
    return await this.databaseService
      .getDatabaseInstance()
      .exec(`DELETE FROM tokens WHERE token = '${token}'`);
  }
}
