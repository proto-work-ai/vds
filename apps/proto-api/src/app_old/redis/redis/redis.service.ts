import { Inject, Injectable } from '@nestjs/common';
import { Observable, Observer } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { redis, REDIS_SUB_CLIENT, REDIS_PUB_CLIENT } from '../redis-settings';
import { RedisClient } from './redis.providers';
import env from '../../environments';

export interface RedisSubscribeMessage {
  readonly message: string;
  readonly channel: string;
}

/**
 * Service to abstract all logic away to connect to the underlying Redis clients
 */
@Injectable()
export class RedisService {
  // inject subscriber and publisher redis client
  constructor(
    @Inject(REDIS_PUB_CLIENT) private readonly pubClient: RedisClient,
    @Inject(REDIS_SUB_CLIENT) private readonly subClient: RedisClient
  ) {
    this.subClient.setMaxListeners(env.clients.redis.maxListeners);
  }

  public get client() {
    return this.pubClient;
  }

  public async get(key) {
    try {
      const results = await this.pubClient.get(key);

      return JSON.parse(results);
    } catch (err) {
      // logger.error(err);

      return null;
    }
  }

  public async del(key) {
    try {
      return this.pubClient.del(key);
    } catch (err) {
      // logger.error(err);

      return err;
    }
  }

  // можно получить ключ и значение, которые будут зарегистрированы в Redis
  public async set(key, value, ttl = redis.expireIn.twentyFourHours) {
    try {
      return this.pubClient.set(key, JSON.stringify(value), 'EX', ttl);
    } catch (err) {
      // logger.error(err);

      return err;
    }
  }

  // Эта функция вернет один или несколько ключей Redis
  public async keys(key) {
    try {
      return this.pubClient.keys(key);
    } catch (err) {
      // logger.error(err);

      return null;
    }
  }

  // удаление ключей Redis, соответствующих определенному шаблону, например userId:123456:*
  public async deleteKeysByMatchingPattern(pattern) {
    try {
      const values = await this.keys(pattern);

      return !values.length || this.del(values);
    } catch (err) {
      // logger.error(err);

      return err;
    }
  }

  public async getAll(pattern) {
    try {
      const keys = await this.keys(pattern);
      const resolveResult = [];
      if (keys?.length) {
        const results = await this.pubClient.mget(keys);

        results.map((item) => resolveResult.push(JSON.parse(item)));

        return resolveResult;
      }

      return resolveResult;
    } catch (err) {
      // logger.error(err);

      return err;
    }
  }

  /**
   * Listening for events of type eventName
   *
   * @param eventName name of the event to keep an eye on
   */
  public fromEvent<T, Event extends string>(eventName: Event): Observable<T> {
    // subscribe to certain event
    this.subClient.subscribe(eventName);

    // make it an observable and return "observer" to catch events of type 'message'
    return Observable.create((observer: Observer<RedisSubscribeMessage>) => {
      this.subClient.on('message', (channel, message) =>
        observer.next({ channel, message })
      );
    }).pipe(
      // then we filter to only get events where the channel is equal to the eventName
      filter(({ channel }) => channel === eventName),
      map(({ message }) => JSON.parse(message))
    );
  }

  /**
   * Publishing messages on channels identified by a specific eventName
   *
   * @param channel channel through which the message is published
   * @param value value being published
   */
  public emit<T = any>(channel: string, value: T): Promise<number> {
    // returning a promise to make sure that we wait for the message to be published and can catch the error otherwise
    return new Promise<number>((resolve, reject) =>
      this.pubClient.publish(channel, JSON.stringify(value), (error, res) => {
        if (error) {
          return reject(error);
        }
        return resolve(res);
      })
    );
  }

  public emitEvent<T extends { type: string; data: any }>(
    event: T
  ): Promise<number> {
    return this.emit(event.type, event.data);
  }
}
