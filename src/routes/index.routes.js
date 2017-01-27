/**
 * @file
 * Specifying the most simple routes
 */

import Router from 'koa-router'; // @see https://github.com/alexmingoia/koa-router
import asyncBusboy from 'async-busboy';
import koabody from 'koa-body';
import {authenticateUser} from '../services/forsrights/forsrights.client';
import {uploadImage, uploadUrl} from '../services/moreinfoUpdate/moreinfoUpdate.client';
import {getWorkForId} from '../services/serviceprovider/serviceprovider.client';
import {validateId, splitPid} from '../utils/validateId.util';
import validateObject from '../utils/validateObject.util';

const bodyparser = new koabody();
const router = new Router();

const date = new Date();
const year = date.getFullYear();


const footer = `
<div id="footer">
  <span><a href="#">Om Upload af forsider</a></span>
  <span class="right">&copy; DBC a/s ${year}</span>
</div>`;

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
          ${footer}
          <script src="/js/index.js"></script>
        </div>
      </body>
    </html>
  `;
});

router.post('/upload/image', async(ctx) => {
  try {
    const {files, fields} = await asyncBusboy(ctx.req);
    const {localIdentifier, libraryId} = splitPid(fields.id);
    // const libraryId = ctx.session.credentials.agency;
    await uploadImage(libraryId, localIdentifier, files[0].path);
    ctx.status = 200;
    ctx.body = JSON.stringify({result: true});
  }
  catch (e) {
    ctx.status = 400;
    ctx.body = JSON.stringify({error: true});
  }
});

router.post('/upload/url', bodyparser, async(ctx) => {
  try {
    const {url, id} = ctx.request.body;
    const {localIdentifier} = splitPid(id);
    const libraryId = ctx.session.credentials.agency;
    await uploadUrl(libraryId, localIdentifier, url);
    ctx.status = 200;
    ctx.body = JSON.stringify({result: true});
  }
  catch (e) {
    ctx.status = 400;
    ctx.body = JSON.stringify({error: true});
  }
});

router.post('/posts', bodyparser, async(ctx) => {
  const {id, type: idType} = validateId(ctx.request.body.id);
  const work = await getWorkForId(id, idType);
  ctx.status = work.error && 400 || 200;
  ctx.body = JSON.stringify(work);
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
      <div class="main login">
          <div id="topbar"></div>
          <div id="content"></div>
          ${footer}
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
  const valid = validateObject({agency: 'string', user: 'string', password: 'string', agreement: 'boolean'}, ctx.request.body);
  const body = ctx.request.body;
  const credentials = {agency: body.agency, user: body.user, password: body.password};
  const result = await authenticateUser(credentials);

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
    ctx.session.credentials = credentials;
    ctx.body = 'success';
    ctx.status = 200;
  }
});


export default router;
