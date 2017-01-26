/**
 * @file
 * Specifying the most simple routes
 */

import Router from 'koa-router'; // @see https://github.com/alexmingoia/koa-router
import asyncBusboy from 'async-busboy';
import koabody from 'koa-body';
import {log} from 'dbc-node-logger';
import {authenticateUser} from '../services/forsrights/forsrights.client';
import {uploadImage, uploadUrl} from '../services/moreinfoUpdate/moreinfoUpdate.client';
import {getWork, search} from '../services/serviceprovider/serviceprovider.client';
import {validateId, splitPid} from '../utils/validateId.util';

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

router.post('/upload/image', async(ctx) => {
  try {
    const {files, fields} = await asyncBusboy(ctx.req);
    const {localIdentifier} = splitPid(fields.id);
    const libraryId = ctx.session.credentials.agency;
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

/**
 * Get work for id of type.
 *
 * @param id
 * @param type
 * @returns {*}
 */
async function getWorkForId(id, type) {
  try {
    if (type === 'error') {
      return {error: 'invalid_id'};
    }
    const fields = ['dcTitleFull', 'creator', 'identifierISBN', 'typeBibDKType', 'pid', 'coverUrlFull'];
    let result;
    if (type === 'pid') {
      result = await getWork({params: {pids: [id], fields}});
    }
    else {
      result = await search({params: {q: `(nr=${id})`, fields}});
    }

    if (!result.error && result.length) {
      const {dcTitleFull, creator, identifierISBN, typeBibDKType, coverUrlFull, pid} = result[0];
      return {
        title: dcTitleFull.join(', '),
        creator: creator.join(', '),
        isbn: identifierISBN.join(', '),
        matType: typeBibDKType.join(', '),
        image: coverUrlFull && coverUrlFull.shift() || null,
        pid: pid.join(', ')
      };
    }
  }
  catch (e) {
    log.error('cannot get work from openplatform', e);
  }
  return {error: 'no_work_for_id'};

}

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
