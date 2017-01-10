/**
 * @file
 * Configure and start the server
 */

// Libraries
import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';

// Middleware
import {LoggerMiddleware} from './middlewares/logger.middleware';
import {SetVersionHeader} from './middlewares/headers.middleware';
import errorMiddleware from './middlewares/error.middleware';
import router from './routes/index.routes';

// Utils
import {CONFIG, validateConfig} from './utils/config.util';
import {log} from './utils/logging.util';
import sanityCheck from './utils/sanityCheck.util';

// Clients
import * as Smaug from './services/smaug/smaug.client';

export function startServer() {
  validateConfig();
  const app = new Koa();
  app.name = 'UFO';
  const PORT = CONFIG.app.port;

  // Sanitychecks
  sanityCheck();

  Smaug.setToken();

  // trust ip-addresses from X-Forwarded-By header, and log requests
  app.proxy = true;

  app.use(convert(serve('./public')));
  app.use(LoggerMiddleware);
  app.use(SetVersionHeader);

  app.use(router);

  app.use(errorMiddleware);

  app.on('error', (err) => {
    log.error('Server error', {error: err.message, stack: err.stack});
  });

  app.listen(PORT, () => {
    log.debug(`Server is up and running on port ${PORT}!`);
  });
}
