/**
 * @file
 * Description...
 */

import {CONFIG} from '../../utils/config.util';
import {promiseRequest} from '../../utils/request.util';
import * as Smaug from '../smaug/smaug.client';
import {log} from 'dbc-node-logger';

/**
 * Get work for id of type.
 *
 * @param id
 * @param type
 * @returns {*}
 */
export async function getWorkForId(id, type) {
  try {
    if (type === 'error') {
      return {error: 'invalid_id'};
    }
    const fields = [
      'dcTitleFull',
      'creator',
      'identifierISBN',
      'typeBibDKType',
      'pid',
      'coverUrlFull'
    ];
    let result;
    if (type === 'pid') {
      result = await getWork({params: {pids: [id], fields}});
    }
    else {
      // openplatform only returns one record from each work
      // so lets try to find the primary record only using a match for the record identifier (faust)
      result = await search({params: {q: `(id=${id})`, fields}});
      if (result.error || !result.length) {
        // Lets try with a broader search, for isbn and other number systems
        result = await search({params: {q: `(nr=${id})`, fields}});
      }
    }

    if (!result.error && result.length) {
      let recPos = 0;
      if (result.length > 1) {
        for (let idx = 0; idx < result.length; idx++) {

          if (
            (result[idx].pid && result[idx].pid[0].indexOf(id) !== -1) ||
            (result[idx].identifierISBN &&
              result[idx].identifierISBN.indexOf(id) !== -1)
          ) {
            recPos = idx;
          }
        }
      }
      const {
        dcTitleFull, creator, identifierISBN, typeBibDKType, coverUrlFull, pid
      } = result[recPos];
      return {
        title: dcTitleFull && dcTitleFull.join(', '),
        creator: creator && creator.join(', '),
        isbn: identifierISBN && identifierISBN.join(', '),
        matType: typeBibDKType && typeBibDKType.join(', '),
        image: (coverUrlFull && coverUrlFull.shift()) || null,
        pid: pid.join(', ')
      };
    }
  }
  catch (e) {
    log.error('cannot get work from openplatform', e);
  }

  return {error: 'no_work_for_id'};
}

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
      log.error('An error occurred while retrieveing data from openplatform', {
        result
      });
      throw new Error('Invalid response from openplatform', result);
    }
    if (
      result.data &&
      result.data.length &&
      Object.keys(result.data[0]).length
    ) {
      return result.data;
    }

    return [];
  }
  catch (e) {
    log.error('Error while parsing response from openplatform', {
      error: e.message,
      stack: e.stack
    });
    return {error: 'Error while parsing response from openplatform'};
  }
}
