import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('token')
  async create() {
    return this.authService.create();
  }

  @Delete('token/:token')
  async delete(@Param('token') token: string) {
    return this.authService.delete(token);
  }
}
