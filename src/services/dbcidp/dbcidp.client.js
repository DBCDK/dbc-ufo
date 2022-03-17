/**
 * @file
 * Description...
 */

import {promiseRequest} from '../../utils/request.util';
import {CONFIG} from '../../utils/config.util';
import {log} from 'dbc-node-logger';
import {MOCKED_POSITIVE_RESPONSE} from './dbcidp.mock';

export async function authenticateUserDbcIdp(credentials) {
  const response = await makeDbcIdpRequest(credentials);
  const result = parseResponseFromDbcIdp(response);

  return result;
}

export function parseResponseFromDbcIdp(response) {
  const result =  {error: 'Could not authenticate user', authenticated: false};

  if (response.error) {
    result.error = response.error;
  }
  else if (response.authenticated && response.rights) {
    response.rights.forEach((right) => {
      if (right.productName === 'DANBIB') {
        result.error = null;
        result.authenticated = true;
      }
    });
  }

  return result;
}

function makeDbcIdpRequest(credentials) {
  if (CONFIG.mock_externals.dbcidp) {
    return MOCKED_POSITIVE_RESPONSE;
  }

  const body = {userIdAut: credentials.user, passwordAut: credentials.password, agencyId: credentials.agency};
  const params = {
    url: CONFIG.dbcidp.uri + '/authorize',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  console.log(params);

  return promiseRequest('post', params).then((response) => {
    try {
      console.log(response.body);
      return JSON.parse(response.body);
    }
    catch (e) {
      log.error('Could not parse response from DbcIdp', {response: response.body});
      return {error: 'Error while parsing response from DbcIdp'};
    }
  });
}
