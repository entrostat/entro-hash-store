import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private databaseService: DatabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.token;
    if (!token) {
      throw new UnauthorizedException();
    }
    return await this.databaseService
      .getDatabaseInstance()
      .get(`SELECT * FROM tokens WHERE token = ?`, token)
      .then((result) => result?.token);
  }
}
