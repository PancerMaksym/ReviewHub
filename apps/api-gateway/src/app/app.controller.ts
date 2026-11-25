import { Controller, All, Req } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request } from 'express';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('*')
  async getData(@Req() req: Request) {
    return this.appService.check(req);
  }
}
