/**
 * @file
 * Specifying the most simple routes
 */

import Router from 'koa-router'; // @see https://github.com/alexmingoia/koa-router

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Image upload</title>
        <link rel="stylesheet" type="text/css" href="/css/index.css"/>
      </head>
      <body>
          <div class="header"><a href="/"><span class="logo"></a></div>
          <div id="content"></div>
          <script src="/js/index.js"></script>
      </body>
    </html>
  `;
});

export default router;
