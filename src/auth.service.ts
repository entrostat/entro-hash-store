import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { isNil } from 'lodash';

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
}
