/**
 * @file
 * Description...
 */

import {promiseRequest} from '../../utils/request.util';
import {CONFIG} from "../../utils/config.util";
import {log} from "../../../../dbc-node-modules/dbc-node-logger/src/index";

export async function authenticateUser(credentials) {
  const response = await makeForsRightsRequest(credentials);
  const result = parseResponseFromForsRights(response);

  return result;
}

function parseResponseFromForsRights(response) {
  const result = {
    error: null,
    authenticated: false
  };

  if (response.forsRightsResponse && response.forsRightsResponse.ressource) {
    response.forsRightsResponse.ressource.forEach((val) => {
      if (val.name['$'] === 'netpunkt.dk' && val.right) {
        val.right.forEach((right) => {
          if (right['$'] === '500') {
            result.authenticated = true;
          }
        });
      }
    });
  }

  if(response.forsRightsResponse && response.forsRightsResponse.error){
    result.error = response.forsRightsResponse.error['$'];
  }


  return result;
}

function makeForsRightsRequest(credentials) {
  const userIdAut = credentials.user;
  const groupIdAut = credentials.agency;
  const passwordAut = credentials.password;

  const params = {
    url: CONFIG.forsrights.uri,
    body: `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:for="http://oss.dbc.dk/ns/forsrights">
   <soapenv:Header/>
   <soapenv:Body>
      <for:forsRightsRequest>
         <for:userIdAut>${userIdAut}</for:userIdAut>
         <for:groupIdAut>${groupIdAut}</for:groupIdAut>
         <for:passwordAut>${passwordAut}</for:passwordAut>
         <for:outputType>json</for:outputType>
      </for:forsRightsRequest>
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
