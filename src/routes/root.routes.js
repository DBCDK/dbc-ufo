/**
 * @file
 * Specifying the most simple routes
 */

import Router from 'koa-router'; // @see https://github.com/alexmingoia/koa-router
import koabody from 'koa-body';

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
          <div class="header"><a href="/"><span class="logo"></a></div>
          <div id="content"></div>
          <script src="/js/index.js"></script>
        </div>
      </body>
    </html>
  `;
});

router.get('/login', (ctx) => {
  ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Log in - Image upload</title>
        <link rel="stylesheet" type="text/css" href="/css/index.css"/>
      </head>
      <body>
      <div class="main">
          <div class="header"><a href="/"><span class="logo"></a></div>
          <div id="content"></div>
          <script src="/js/login.js"></script>
        </div>
      </body>
    </html>
  `;
});

router.post('/login', bodyparser, async(ctx) => {
  const valid = validateBody(ctx.request.body);

  if (!valid) {
    ctx.status = 406;
    ctx.body = 'invalid request';
  }

  // TODO do forsrights request

  ctx.session.authenticated = true;
  ctx.body = 'success';
  ctx.status = 200;
});

function validateBody(body) {
  if (!body.agencyid || typeof body.agencyid !== 'string') {
    return false;
  }

  if (!body.user || typeof body.user !== 'string') {
    return false;
  }

  if (!body.pin || typeof body.pin !== 'string') {
    return false;
  }

  return true;
}

export default router;
