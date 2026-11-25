import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const databaseUrl =
      `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}` +
      `@postgres:5432/reviewHub`;
    console.log('[Prisma] Constructor.start: ', databaseUrl);

    const adapter = new PrismaPg({
      connectionString: databaseUrl,
    });
    console.log('[Prisma] Constructor.end');
    super({ adapter });
  }

  async onModuleInit() {
    console.log('[Prisma] Init.start');
    await this.$connect();
    console.log('[Prisma] Init.end');
  }
  async onModuleDestroy() {
    console.log('[Prisma] Destroy.start');
    await this.$disconnect();
    console.log('[Prisma] Destroy.end');
  }
}
