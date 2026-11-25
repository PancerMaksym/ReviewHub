import {
  PrismaService,
} from '@review-hub/prisma';
import { OAuthProvidersEnum } from '@review-hub/enums'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Response } from 'express';
import {OAUTH_PROVIDERS} from '../assets/oauth.config'

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async oauth(provider: OAuthProvidersEnum, res: Response) {
    if(provider === OAuthProvidersEnum.LOCAL) throw new Error('Wrong method')
    const config = OAUTH_PROVIDERS[provider];

    const url = new URL(config.authorizationUrl);

    url.searchParams.set('client_id', '');
    url.searchParams.set('redirect_uri', `http://myapp.local/auth/callback/${provider}`);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', config.scopes.join(' '));
    url.searchParams.set('state', state);

    return res.redirect(url.toString());
  }

  async login(login: string, password: string): Promise<any> {
    try {
      console.log('[Auth] Login.start: ', login, password);
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { email: login },
      });
      if (!user.password) {
        throw new UnauthorizedException('Use OAuth login');
      }

      const valid = await argon2.verify(user.password, password);

      if (!valid) {
        throw new UnauthorizedException();
      }

      const token = await this.jwtService.signAsync(
        { id: user.id, login: user.email },
        {
          expiresIn: '14d',
        },
      );
      console.log('[Auth] Login.end: ', token);
      return token;
    } catch (err) {
      console.log('[Auth] Login.error: ', err);
      throw new Error();
    }
  }

  async register(
    login: string,
    provider: OAuthProvidersEnum,
    password?: string,
  ): Promise<any> {
    try {
      console.log('[Auth] Register.start: ', login, password);

      const user = await this.prismaService.user.findFirst({
        where: { email: login },
      });
      if (user) throw new Error('User Exist');
      const hash = password ? await argon2.hash(password) : null;
      const newUser = await this.prismaService.user.create({
        data: {
          email: login,
          password: password !== undefined ? hash : null,
          oAuthProviders: {
            create: {
              provider
            }
          }
        },
        include: {
          oAuthProviders: true
        }
      });
      console.log('[Auth] Register.end: ', newUser);
      return 'Success';
    } catch (err) {
      console.log('[Auth] Register.error: ', err);
      throw new Error();
    }
  }

  async getUser(id: number): Promise<any> {
    try {
      console.log('[Auth] GetUser.start: ', id);
      const user = await this.prismaService.user.findFirstOrThrow({
        where: { id: id },
      });
      console.log('[Auth] GetUser.end: ', user);
      return user;
    } catch (err) {
      console.log('[Auth] GetUser.error: ', err);
      throw new Error();
    }
  }

  async getPost(id: number): Promise<any> {
    try {
      console.log('[Auth] GetPost.start: ', id);
      const post = this.prismaService.post.findFirstOrThrow({
        where: { id: id },
      });
      console.log('[Auth] GetPost.end: ', post);
      return post;
    } catch (err) {
      console.log('[Auth] GetPost.error: ', err);
      throw new Error();
    }
  }

  async getMe(req: Request): Promise<any> {
    try {
      console.log('[Auth] GetMe.start: ', req);
      const authHeader = req.headers.get('authorization');
      if (!authHeader) throw new Error('Header Error');
      const token = authHeader.replace('Bearer ', '');
      const data = await this.jwtService.verify(token);
      const user = await this.prismaService.user.findFirstOrThrow({
        where: { id: data.id },
      });
      console.log('[Auth] GetMe.end: ', user);
      return user;
    } catch (err) {
      console.log('[Auth] GetMe.error: ', err);
      throw new Error();
    }
  }
}
