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
  ctx.body = page('<div id="content"></div>', 'login', '/js/login.js');
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
  const valid = validateObject({
    agency: 'string',
    user: 'string',
    password: 'string',
    agreement: 'boolean'
  }, ctx.request.body);
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
`, 'medium');
});

/* eslint-disable*/
router.get('/terms', async(ctx) => {
  ctx.body = page(`
    <div class="page">
        <h1>Retningslinjer for upload af forsider</h1>
        <p>DBC har etableret en service, som gør det muligt for biblioteker at uploade forsideillustrationer til Forsideservice / MoreInfo.</p>
        <p>Baggrunden er den aftale, som ultimo 2005 blev indgået mellem Kommunernes Landsforening og COPY-DAN Tekst & Node og Billedkunst: ”Rammeaftale om eksemplarfremstilling og offentlig fremførelse af bogomslag” for kommunal anvendelse. En parallel aftale blev indgået mellem den daværende Biblioteksstyrelse og COPY-DAN vedr. statslige bibliotekers adkomst. Aftalen trådte i kraft 1. januar 2006.</p>
        <p>Det er en forudsætning – ud over at tegne abonnement på Forsideservice hos DBC – at bibliotekerne har indgået aftale med COPY-DAN.</p>
        <p>Der er i aftalen nogle begrænsninger på, hvilken opløsning, der maksimalt må anvendes til visningen. Der er dog forhandlinger i gang mellem DDB og COPY-DAN om en ny aftale, og i denne ser det ud til, at der blødes en del op på de begrænsninger, der ligger i den eksisterende aftale.</p>
        <p>Aftalen kan ses her: https://tekstognode.dk/biblioteker - fra samme side er det muligt at fremsøge forlag, som har givet tilladelse til brug af bogomslag (https://www.tekstognode-online.dk/soeg/101135fuldmagt/101066soeg.aspx). Det påhviler den bruger, som vil uploade en forside at sikre, at der er den nødvendige tilladelse / fuldmagt fra det pågældende forlag.</p>
        <p>Som alternativ til upload af billedfiler er det muligt at uploade URL’er til billeder hos en ekstern leverandør, og her påhviler det brugeren at sikre, at pågældende host / database har givet rettigheder til fremvisning af forsiderne.</p>
        <p>Hvis DBC modtager indsigelser i relation til anvendelse af forsider, vil disse blive fjernet fra basen. Det er muligt ved gentagne henvendelser vedr. forsider fra samme bibliotek, at dette vil blive kontaktet for præcisering af retningslinjerne.</p>
        <p>Billedfiler uploades i .JPG format, og der er sat en minimumsopløsning på 500 * 500 pixels. DBC sørger i det videre flow af billederne til basen for, at der skaleres til den ifølge COPY-DAN aftalerne p.t. gældende tilladte opløsning. Forsiderne kan forventes at blive synlige fra Forsideservice dagen efter upload.</p>
        <p>For aktivering af servicen på ufo.dbc.dk anvendes bibliotekets login til Netpunkt.</p>
        <p>Læs i øvrigt selve brugervejledningen efter indlogning.</p>
    </div>
`, 'medium');
});
/* eslint-enable*/

router.get('/about', async(ctx) => {
  ctx.body = page(`
    <div class="page">
        <h1>Om upload af forsider</h1>
        <p>Upload af forsider er en service ...</p>
    </div>
`, 'medium');
});

export default router;
