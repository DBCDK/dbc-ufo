/**
 * @file
 * Description...
 */

import {promiseRequest} from '../../utils/request.util';
import {CONFIG} from '../../utils/config.util';
import {log} from 'dbc-node-logger';
import {MOCKED_POSITIVE_RESPONSE} from './forsrights.mock';

export async function authenticateUser(credentials) {
  const response = await makeForsRightsRequest(credentials);
  const result = parseResponseFromForsRights(response);

  return result;
}

export function parseResponseFromForsRights(response) {
  const result = {
    error: null,
    authenticated: false
  };

  if (response.forsRightsResponse && response.forsRightsResponse.error) {
    result.error = response.forsRightsResponse.error.$;
  }

  else if (response.forsRightsResponse && response.forsRightsResponse.ressource) {
    response.forsRightsResponse.ressource.forEach((val) => {
      if (val.name.$ === 'netpunkt.dk' && val.right) {
        val.right.forEach((right) => {
          if (right.$ === '500') {
            result.authenticated = true;
          }
        });
      }
    });
  }

  return result;
}

function makeForsRightsRequest(credentials) {
  if (CONFIG.mock_externals.forsrights) {
    return MOCKED_POSITIVE_RESPONSE;
  }

  const userIdAut = credentials.user;
  const groupIdAut = credentials.agency;
  const passwordAut = credentials.password;

  const params = {
    url: CONFIG.forsrights.uri,
    body: `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ufo="http://oss.dbc.dk/ns/forsrights">
   <soapenv:Header/>
   <soapenv:Body>
      <ufo:forsRightsRequest>
         <ufo:userIdAut>${userIdAut}</ufo:userIdAut>
         <ufo:groupIdAut>${groupIdAut}</ufo:groupIdAut>
         <ufo:passwordAut>${passwordAut}</ufo:passwordAut>
         <ufo:outputType>json</ufo:outputType>
      </ufo:forsRightsRequest>
   </soapenv:Body>
</soapenv:Envelope>`
  };

  return promiseRequest('post', params).then((forsRightsResponse) => {
    try {
      return JSON.parse(forsRightsResponse.body);
    }
    catch (e) {
      log.error('Could not parse response from ForsRights', {response: forsRightsResponse.body});
      return {error: 'Error while parsing response from ForsRights'};
    }
  });
}
