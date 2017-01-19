/**
 * @file
 * Specifying the most simple routes
 */

import Router from 'koa-router'; // @see https://github.com/alexmingoia/koa-router
import koabody from 'koa-body';
import {authenticateUser} from '../services/forsrights/forsrights.client';

const bodyparser = new koabody();

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Image upload</title>
        <link rel="stylesheet" type="text/css" href="/css/index.css"/>
      </head>
      <body>
        <div class="main">
          <div id="topbar"></div>
          <div id="content"></div>
          <script src="/js/index.js"></script>
        </div>
      </body>
    </html>
  `;
});

router.get('/login', async(ctx) => {
  ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Log in - Image upload</title>
        <link rel="stylesheet" type="text/css" href="/css/index.css"/>
      </head>
      <body>
      <div class="main">
          <div id="topbar"></div>
          <div id="content"></div>
          <script src="/js/login.js"></script>
        </div>
      </body>
    </html>
  `;
});

router.get('/logout', (ctx) => {
  ctx.session = null;
  ctx.redirect('/login');
});

router.get('/isauthenticated', async (ctx, next) => {
  ctx.body = !!ctx.session.authenticated;
  await next();
});

router.post('/login', bodyparser, async(ctx) => {
  const valid = validateBody(ctx.request.body);
  const body = ctx.request.body;
  const result = await authenticateUser({agency: body.agency, user: body.user, password: body.password});

  if (!valid) {
    ctx.session.authenticated = false;
    ctx.status = 406;
    ctx.body = 'invalid request';
  }
  else if (result.error || !result.authenticated) {
    ctx.session.authenticated = false;
    ctx.status = 401;
    ctx.body = result.error || 'user could not be authenticated';
  }
  else {
    ctx.session.authenticated = true;
    ctx.body = 'success';
    ctx.status = 200;
  }
});

function validateBody(body) {
  if (!body.agency || typeof body.agency !== 'string') {
    return false;
  }

  if (!body.user || typeof body.user !== 'string') {
    return false;
  }

  if (!body.password || typeof body.password !== 'string') {
    return false;
  }

  if (!body.agreement || typeof body.agreement !== 'boolean') {
    return false;
  }

  return true;
}

export default router;
