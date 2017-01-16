/**
 * @file
 * Session store class
 */
import Redis from "ioredis";
import {Store} from "koa-session2";
import {CONFIG} from "../utils/config.util";

export default class Sessiontore extends Store {
  constructor() {
    super();
    this.redis = new Redis();
  }

  async get(sid) {
    const data = await this.redis.get(`${CONFIG.session.key}:${sid}`);
    return JSON.parse(data);
  }

  async set(session, opts) {
    if(!opts.sid) {
      opts.sid = this.getID(24);
    }
    await this.redis.set(`${CONFIG.session.key}:${opts.sid}`, JSON.stringify(session));
    return opts.sid;
  }

  async destroy(sid) {
    return await this.redis.del(`${CONFIG.session.key}:${sid}`);
  }
}
