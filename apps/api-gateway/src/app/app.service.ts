import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Request } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async check(req: Request): Promise<any> {
    console.log('[API] main.start');
    const config: AxiosRequestConfig = {
      headers: req.headers,
      params: req.query,
    };
    const url = `http://auth-service:3000${req.url.replace('/auth', '')}`;

    const response = await this.httpService.axiosRef.request({
      method: req.method,
      url,
      data: req.body,
      ...config,
    });
    console.log('[API] main.end');
    return response.data;
  }
}
