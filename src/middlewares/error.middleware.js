/**
 * @file
 * Add methods for handling the state object
 */

import {log} from 'dbc-node-logger';

/**
 * Adds the get- and setState methods to the context object
 *
 * @param {object} ctx
 * @param {function} next
 */
export default async function errorMiddleware(ctx, next) {
  try {
    await next();

    if (ctx.status === 404) {
      ctx.throw(404);
    }
    else if (ctx.status === 403) {
      ctx.throw(403);
    }
  }
  catch (err) {
    ctx.status = err.status || 500;

    let error = 'Der er sket en fejl. Prøv at logge ind igen';
    if (ctx.status === 403) {
      error = 'Du har ikke adgang til denne side. Dette kan skyldes, at der benyttes et ugyldigt token';
    }
    else if (ctx.status === 404) {
      error = 'Siden, du forsøger at tilgå, findes ikke';
    }
    else {
      log.error('An error has happened', {error: err.message, stack: err.stack, url: ctx.url});
    }

    ctx.body = `Error: ${error}`;
  }
}
