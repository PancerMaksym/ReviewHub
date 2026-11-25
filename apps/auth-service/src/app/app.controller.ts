import { Body, Controller, Get, Post, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthEntity } from '@review-hub/entity';
import { LoginDto } from '@review-hub/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() { email, password }: LoginDto) {
    return await this.appService.login(email, password);
  }

  @Post('/register')
  async register(@Body() { email, password }: LoginDto) {
    return await this.appService.register(email, password);
  }

  @Get('/user/:id')
  async getUser(@Param('id') id: number) {
    return await this.appService.getUser(id);
  }

  @Get('/user/post')
  async getPost(@Param('id') id: number) {
    return await this.appService.getPost(id);
  }

  @Get('/me')
  async geMe(@Req() req: Request) {
    return await this.appService.getMe(req);
  }
}
