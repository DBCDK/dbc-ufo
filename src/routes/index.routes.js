/**
 * @file
 * Specifying the most simple routes
 */

import Router from 'koa-router'; // @see https://github.com/alexmingoia/koa-router
import asyncBusboy from 'async-busboy';
import fs from 'fs';
import path from 'path';
import koabody from 'koa-body';
import {authenticateUser} from '../services/forsrights/forsrights.client';
import {getWork} from '../services/serviceprovider/serviceprovider.client';
import {validateId} from '../utils/validateId.util';
import {log} from 'dbc-node-logger';

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

router.post('/upload', async (ctx) => {
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

router.post('/posts', bodyparser, async (ctx) => {
  const {id, type: idType} = validateId(ctx.request.body.id);
  let work;
  try {
    switch (idType) {
      case 'pid':
        work = (await getWork({params: {pids: [id]}})).data[0];
        break;
      default:
        ctx.status = 402;
    }
    if (!Object.keys(work).length) {
      ctx.status = 402;
      return;
    }
    const {dcTitleFull: title, creator, identifierISBN: isbn, typeBibDKType: matType} = work;
    ctx.status = 200;
    ctx.body = JSON.stringify({title, creator, isbn, matType, id, idType});
  }
  catch (e) {
    log.error(e);
  }
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

router.get('/isauthenticated', async(ctx, next) => {
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
