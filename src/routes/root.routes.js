/**
 * @file
 * Specifying the most simple routes
 */

import Router from 'koa-router'; // @see https://github.com/alexmingoia/koa-router

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Image upload</title>
      </head>
      <body>
          <div id="content"></div>
          <script src="/js/index.js"></script>
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
      </head>
      <body>
          <div id="content"></div>
          <script src="/js/login.js"></script>
      </body>
    </html>
  `;
});

export default router;
