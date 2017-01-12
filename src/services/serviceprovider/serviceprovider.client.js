/**
 * @file
 * Description...
 */

import {CONFIG} from '../../utils/config.util';
import {promiseRequest} from '../../utils/request.util';
import * as Smaug from '../smaug/smaug.client';
import {log} from 'dbc-node-logger';

export async function getWork({params}) {
  return await makeRequestToServiceProvider(params, 'work');
}

export async function search({params}) {
  return await makeRequestToServiceProvider(params, 'search');
}

async function makeRequestToServiceProvider(params, endpoint) {
  const token = await Smaug.getToken();
  const qs = Object.assign(params, {access_token: token});

  const req = {
    url: `${CONFIG.openplatform.serviceprovider.uri}/${endpoint}`,
    qs: qs
  };

  const response = await promiseRequest('post', req);
  try {
    const result = JSON.parse(response.body);

    if (result.statusCode !== 200) {
      log.error('An error occurred while retrieveing data from openplatform', {result});
    }

    return result;
  }
  catch (e) {
    log.error('Error while parsing response from openplatform', {error: e.message, stack: e.stack});
    return {error: 'Error while parsing response from openplatform'};
  }
}
