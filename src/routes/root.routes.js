/**
 * @file
 * Specifying the most simple routes
 */

import Router from 'koa-router'; // @see https://github.com/alexmingoia/koa-router
import asyncBusboy from 'async-busboy';
import fs from 'fs';
import path from 'path';

const router = new Router();

router.get('/', async(ctx) => {
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

router.post('/upload', async(ctx) => {
  try {
    const {files} = await asyncBusboy(ctx.req);
    files.forEach(async(file) => {
      // TODO sent image to MoreInfo Update instead of public folder.
      var newPath = path.join(__dirname, '../../', 'public', file.filename);
      await fs.rename(file.path, newPath);
    });
    ctx.status = 200;
    ctx.body = JSON.stringify({result: true});
  }
  catch (e) {
    ctx.body = JSON.stringify({error: e});
  }
});

export default router;
