/**
 * @file
 * Configure and start the server
 */

// Libraries
import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import session from 'koa-session2';

// Middleware
import {LoggerMiddleware} from './middlewares/logger.middleware';
import {SetVersionHeader} from './middlewares/headers.middleware';
import errorMiddleware from './middlewares/error.middleware';
import * as Session from './middlewares/session.middleware';
import router from './routes/index.routes';

// Session
import SessionStore from './session/store.session';

// Utils
import * as Logger from 'dbc-node-logger';
import {CONFIG, validateConfig} from './utils/config.util';
import sanityCheck from './utils/sanityCheck.util';
import {VERSION} from './utils/version.util';

// Clients
import * as Smaug from './services/smaug/smaug.client';

export function startServer() {
  validateConfig();
  const app = new Koa();
  app.name = 'UFO';
  const PORT = CONFIG.app.port;
  Logger.setInfo({name: 'Forsideupload', version: VERSION});

  // Sanitychecks
  sanityCheck();

  Smaug.setToken();

  // trust ip-addresses from X-Forwarded-By header, and log requests
  app.proxy = true;

  const sessionConfig = CONFIG.session.redis
    ? {
        key: CONFIG.session.key,
        store: new SessionStore(CONFIG.session.redis),
        maxAge: 2592000000 // 30 days (miliseconds)
      }
    : {key: CONFIG.session.key};
  app.use(session(sessionConfig));

  app.use(convert(serve('./public')));
  app.use(LoggerMiddleware);
  app.use(SetVersionHeader);

  app.use(Session.RefreshSession);

  app.use(router.routes());

  app.use(errorMiddleware);

  app.on('error', err => {
    Logger.log.error('Server error', {error: err.message, stack: err.stack});
  });

  app.listen(PORT, () => {
    Logger.log.debug(`Server is up and running on port ${PORT}!`);
  });
}
