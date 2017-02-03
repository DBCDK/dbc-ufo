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
import {AuthenticationCheck} from '../middlewares/session.middleware';
import validateObject from '../utils/validateObject.util';
import page from '../utils/template.util';

const bodyparser = new koabody();
const router = new Router();

router.get('/', AuthenticationCheck, (ctx) => {
  ctx.body = page();
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
    const {localIdentifier, libraryId} = splitPid(id);
    // const libraryId = ctx.session.credentials.agency;
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
  ctx.body = page('<div id="content"></div>', '/js/login.js', 'login');
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

router.get('/help', async(ctx) => {
  ctx.body = page(`
    <div class="page">
        <h1>Hjælp til upload</h1>
        <h2>Upload af billedfiler</h2>
        <p>Træk filer eller vælg ved at klikke på knappen.</p>
        <h2>Tilføjelse af billeder via URL'er</h2>
        <p>Du kan skrive et eller flere ...</p>
    </div>
`);
});

router.get('/about', async(ctx) => {
  ctx.body = page(`
    <div class="page">
        <h1>Om upload af forsider</h1>
        <p>Upload af forsider er en service ...</p>
    </div>
`);
});


export default router;
