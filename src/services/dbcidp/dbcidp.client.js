/**
 * @file
 * Description... fetch rights from DBCIDP and look for the DANBIB ressource
 */

import {promiseRequest} from '../../utils/request.util';
import {CONFIG} from '../../utils/config.util';
import {log} from 'dbc-node-logger';
import {MOCKED_POSITIVE_RESPONSE} from './dbcidp.mock';

/**
 *
 * @param credentials - the good and old netpunkt tripple
 * @returns {Promise<{authenticated: boolean, error: string}>}
 */
export async function authenticateUserDbcIdp(credentials) {
  const response = await makeDbcIdpRequest(credentials);
  const result = parseResponseFromDbcIdp(response);

  return result;
}

/**
 * Look for rights to the Danbib product
 *
 * @param response
 * @returns {{authenticated: boolean, error: string}}
 */
export function parseResponseFromDbcIdp(response) {
  const result = {error: 'Could not authenticate user', authenticated: false};

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

/**
 * Fetch authorization from DBCIDP
 *
 * @param credentials - the god and old netpunkt tripple
 * @returns {{authenticated: boolean, rights: [{name: string, description: string, productName: string}, {name: string, description: string, productName: string}]}|Promise<unknown>}
 */
function makeDbcIdpRequest(credentials) {
  if (CONFIG.mock_externals.dbcidp) {
    return MOCKED_POSITIVE_RESPONSE;
  }

  const params = {
    url: CONFIG.dbcidp.uri + '/authorize',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  };

  return promiseRequest('post', params).then((response) => {
    try {
      return JSON.parse(response.body);
    }
    catch (e) {
      log.error('Could not parse response from DbcIdp', {response: response.body});
      return {error: 'Error while parsing response from DbcIdp'};
    }
  });
}
