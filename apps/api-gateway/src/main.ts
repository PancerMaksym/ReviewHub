import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Allow cookies/auth headers
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  });
  await app.listen(3000, '0.0.0.0');

  Logger.log(`🚀 Application is running on: http://localhost:${3000}`);
}

bootstrap();
