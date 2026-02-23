import { Provider } from '@nestjs/common';
import Redis from 'ioredis';

import { REDIS_SUB_CLIENT, REDIS_PUB_CLIENT } from '../redis-settings';
import env from '../../environments';

export type RedisClient = Redis;

const port = env.clients.redis.port;
const host = env.clients.redis.host;

export const redisProviders: Provider[] = [
  {
    provide: REDIS_SUB_CLIENT,
    useFactory: (): RedisClient => new Redis({ host, port })
  },
  {
    provide: REDIS_PUB_CLIENT,
    useFactory: (): RedisClient => new Redis({ host, port })
  }
];
