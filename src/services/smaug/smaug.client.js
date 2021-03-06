/**
 * @file
 * Implementing Smaug
 */

import {CONFIG} from '../../utils/config.util';
import {promiseRequest} from '../../utils/request.util';
import {log} from 'dbc-node-logger';

let TOKEN = null;

/**
 * Returns the current set TOKEN.access_token.
 * If the current set token is invalid a new one will be requested and returned.
 *
 * @return {string}
 */
export async function getToken() {
  if (tokenIsValid()) {
    return TOKEN.access_token;
  }

  await setToken();
  return TOKEN.access_token;
}

/**
 * Requests a new token from smaug and sets TOKEN upon sucess
 */
export async function setToken() {
  const token = await getNewTokenFromSmaug();
  if (token.error) {
    log.error('Error while retrieving token from Smaug', {response: token});
  }
  else {
    token.expires = Date.now() + (token.expires_in * 1000) - 100000;
    log.info('Smaug token was set', {token});
    TOKEN = token;
    Object.freeze(TOKEN);
  }
}

/**
 * Check if Smaug webservice is up.
 *
 * @returns {*}
 */
export async function health() {
  return await promiseRequest('get', {
    uri: CONFIG.openplatform.smaug.uri + '/health'
  });
}

/**
 * Validated the current set TOKEN is valid.
 *
 * @return {boolean}
 */
function tokenIsValid() {
  if (!TOKEN) {
    return false;
  }

  if (!TOKEN.access_token) {
    return false;
  }

  if (Date.now() >= TOKEN.expires) {
    return false;
  }

  return true;
}

/**
 * Requests a new token from Smaug and return the response
 *
 * @return {*}
 */
function getNewTokenFromSmaug() {
  if (CONFIG.mock_externals.smaug) {
    return {
      token_type: 'bearer',
      access_token: 'smaug_token',
      expires_in: 2592000
    };
  }

  const req = {
    url: `${CONFIG.openplatform.smaug.uri}/oauth/token`,
    form: {
      grant_type: 'password',
      username: '@',
      password: '@'
    },
    auth: {
      user: CONFIG.openplatform.smaug.client_id,
      pass: CONFIG.openplatform.smaug.client_secret
    }
  };
  return promiseRequest('post', req).then((smaugResp) => {
    try {
      return JSON.parse(smaugResp.body);
    }
    catch (e) {
      log.error('Could not parse response from Smaug', {response: smaugResp.body});
      throw new Error('Could not parse response from Smaug');
    }
  });
}
