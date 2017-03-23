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
import {CONFIG} from '../utils/config.util';

const bodyparser = new koabody();
const router = new Router();

router.get(/(\/$|url|image)/, AuthenticationCheck, (ctx) => {
  ctx.body = page({settings: {maxFileSize: CONFIG.upload.max_file_size}});
});

router.post('/upload/image', async(ctx) => {
  try {
    const {files, fields} = await asyncBusboy(ctx.req);
    const {localIdentifier, libraryId} = splitPid(fields.id);
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
  ctx.body = page({className: 'login', script: '/js/login.js'});
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
/* eslint-disable*/

router.get('/help', async(ctx) => {
  ctx.body = page({
    content: `
    <div class="page">
      <h2>Hvilken upload-metode skal jeg vælge?</h2>
      <ol>
          <li>Har du billederne liggende på en computer, tablet eller lignende? Så brug ”Upload billeder”</li>
          <li>Hvis billederne ligger på en anden hjemmeside og af rettighedsmæssige årsager ikke må uploades til
              Forsideservice, så brug ”Indsæt URL’er”.
          </li>
      </ol>

      <p>I begge tilfælde har du ud over et billede også brug for en identifikation af det enkelte materiale. Du kan bruge
          ISBN, faustnr. eller pid.</p>


      <h2>Hvordan skal jeg uploade?</h2>
      <p>Uanset hvilken metode, du benytter til upload af billeder, skal du først uploade billederne og derefter tilknytte
          billederne til den ønskede post. Posten angives for det enkelte billede ved hjælp af ISBN, faustnr. eller
          pid.</p>

      <h3>Upload Billeder</h3>
      <ol>
          <li>Tilføj billeder ved at trække filer ind i upload-feltet eller ved at klikke på ”Vælg billeder” og finde
              filerne på din computer.
          </li>
          <li>De tilføjede billeder vil blive vist i et preview i en liste på siden. Her er det muligt ud for hvert
              billede at angive et ID for den post, billedet skal knyttes til.
          </li>
          <li>Når du har angivet ID for et billede, skal du trykke på ”Opdater” for at hente postens data fra brønden.
          </li>
          <li>Hvis posten allerede har et billede tilknyttet i Forsideservice, vil det blive vist i listen ved siden af
              det billede, du lige har tilføjet.
          </li>
          <li>Tjek at alle billeder har det rigtige ID og at status for billedet er ”Klar til upload” og tryk på ”Upload
              billeder”
          </li>
      </ol>
      <p><b>TIP:</b> Du kan navngive billedfilerne med postens ID, så vil postens data automatisk blive hentet og vist i
          preview.</p>


      <h3>Upload URL'er</h3>
      <ol>
          <li>Tilføj billeder ved at skrive URL’er ind i tekstfeltet øverst på siden. Skriv en URL pr. linie.</li>
          <li>Tryk på ”Hent preview”.</li>
          <li>De tilføjede billeder vil blive vist i et preview i en liste på siden. Her er det muligt ud for hvert
              billede at angive et ID for den post, billedet skal knyttes til.
          </li>
          <li>Når du har angivet ID for et billede, skal du trykke på ”Opdater” for at hente postens data fra brønden.
          </li>
          <li>Hvis posten allerede har et billede tilknyttet i Forsideservice, vil det blive vist i listen ved siden af
              det billede, du lige har tilføjet.
          </li>
          <li>Tjek at alle billeder har det rigtige ID og at status for billedet er ”Klar til upload” og tryk på ”Upload
              billeder”
          </li>
      </ol>

      <p><b>TIP:</b> Du kan skrive postens ID efter billedets URL’en i tekstfeltet øverst, så vil postens data automatisk
          blive hentet og vist i preview. Der skal være et mellemrum eller et tabulatortegn imellem URL og ID.</p>

      <h2>Fejl i billeder</h2>
      <p>Hvis et billede er mindre end minimumsstørrelsen enten i pixels (500 x 500) eller i antal MB, vil det ikke kunne
          uploades. Hvis der er noget galt med billedfilen, kan billedet heller ikke uploades.</p>
      <p>Billeder med fejl vil blive vist i en separat liste under preview, hvor det er muligt at erstatte billederne
          enkeltvis med billeder i fx højere pixelopløsning.</p>

      <h2>Fejl under upload</h2>
      <p>Hvis der opstår fejl undervejs i upload af billeder, vil du få mulighed for at uploade de fejlende billeder igen.
          Tryk på knappen ”Prøv igen med de fejlede billeder”.</p>
    </div>
    `, className: 'medium'
  });
});

router.get('/terms', async(ctx) => {
  ctx.body = page({
    content: `
    <div class="page">
        <h1>Retningslinjer for upload af forsider</h1>
        <p>DBC har etableret en service, som gør det muligt for biblioteker at uploade forsideillustrationer til Forsideservice / MoreInfo.</p>
<p>Baggrunden er den aftale, som ultimo 2005 blev indgået mellem Kommunernes Landsforening og COPY-DAN Tekst & Node og Billedkunst: ”Rammeaftale om eksemplarfremstilling og offentlig fremførelse af bogomslag” for kommunal anvendelse. En parallel aftale blev indgået mellem den daværende Biblioteksstyrelse og COPY-DAN vedr. statslige bibliotekers adkomst. Aftalen trådte i kraft 1. januar 2006.</p>
<p>Det er en forudsætning – ud over at tegne abonnement på Forsideservice hos DBC – at bibliotekerne har indgået aftale med COPY-DAN.</p>
<p>Der er i aftalen nogle begrænsninger på, hvilken opløsning, der maksimalt må anvendes til visningen. Der er dog forhandlinger i gang mellem DDB og COPY-DAN om en ny aftale, og i denne ser det ud til, at der blødes en del op på de begrænsninger, der ligger i den eksisterende aftale.</p>
<p>Aftalen kan ses her: <a href="https://tekstognode.dk/biblioteker">https://tekstognode.dk/biblioteker</a> - fra samme side er det muligt at fremsøge forlag, som har givet tilladelse til brug af bogomslag (<a href="https://www.tekstognode-online.dk/soeg/101135fuldmagt/101066soeg.aspx">https://www.tekstognode-online.dk/soeg/101135fuldmagt/101066soeg.aspx</a>). Det påhviler den bruger, som vil uploade en forside at sikre, at der er den nødvendige tilladelse / fuldmagt fra det pågældende forlag.</p>
<p>Som alternativ til upload af billedfiler er det muligt at uploade URL’er til billeder hos en ekstern leverandør, og her påhviler det brugeren at sikre, at pågældende host / database har givet rettigheder til fremvisning af forsiderne.</p>
<p>BEMÆRK: De skannede forsider må ikke være forsynet med labels eller andre markeringer, som anvendes i nogle biblioteker til fx placeringsangivelse o.l.</p>
<p>Hvis DBC modtager indsigelser i relation til anvendelse af forsider, vil disse blive fjernet fra basen. Det er muligt ved gentagne henvendelser vedr. forsider fra samme bibliotek, at dette vil blive kontaktet for præcisering af retningslinjerne.</p>
<p>Billedfiler uploades i .JPG format, og der er sat en minimumsopløsning på 500 * 500 pixels. DBC sørger i det videre flow af billederne til basen for, at der skaleres til den ifølge COPY-DAN aftalerne p.t. gældende tilladte opløsning. Forsiderne kan forventes at blive synlige fra Forsideservice dagen efter upload.</p>
<p>For aktivering af servicen på ufo.dbc.dk anvendes bibliotekets login til Netpunkt.</p>
<p><a href="/help">Læs i øvrigt selve brugervejledningen efter indlogning</a>.</p>
    </div>
`, className: 'medium'
  });
});

router.get('/about', async(ctx) => {
  ctx.body = page({
    content: `
    <div class="page">
    <h1>Om Upload af forsider</h1>
    <p><b>Forsideservice</b> er en service, som giver danske biblioteker mulighed for at vise billeder af forsider og bagsider for deres materialer. Upload af forsider er en tilføjelse til Forsideservice, som gør det muligt for bibliotekerne at tilknytte egne billeder til materialerne. Begge services er udviklet af DBC a/s.</p>
    <p>Forsideservice indeholder billeder af forsider for bøger, film, spil, musik. Forsiderne scannes af DBC, når materialerne registreres til Nationalbiografien. Pr. 1. jan 2017 indeholder Forsideservice ca. 150.000 forsider. Der er ikke forsider for alle bibliotekernes materialer. Upload af forsider gør det muligt at lægge forsider billeder ind i Forsideservice, fx for de materialer, som DBC ikke har scannet.</p>
    <p>I udgangspunktet er det kun biblioteker, der kan uploade forsider, og login sker ved hjælp af en Netpunkt triple, som bibliotekerne også anvender i forbindelse med DBCs andre nationale services.</p>
    <p>De forsider, som uploades, vil være tilgængelige for alle, der benytter Forsideservice. En undtagelse er dog, hvis et bibliotek uploader billeder for et materiale, der i forvejen har en forside. I så fald vil det uploadede billede kun være tilgængeligt for det bibliotek, som uploader billedet.</p>
    </div>
`, className: 'medium'
  });
});

/* eslint-enable*/

export default router;
