/**
 * @file
 * Perform sanityCheck of external resources
 */

import * as Smaug from '../services/smaug/smaug.client';

import {log} from './logging.util';

export default async function sanityCheck() {
  return await Promise.all([
    wrap(checkSmaug, 'smaug')
  ]);
}

/**
 * Wraps sanity checks to return uniform responses
 * @param check
 * @param name
 * @returns {{name: string}}
 */
async function wrap(check, name) {
  let state = 'ok';
  try {
    await check();
  }
  catch (e) {
    log.error(`call to ${name} failed during sanity check`, {error: e.message, stack: e.stack});
    state = 'fail';
  }

  return {name, state};
}

/**
 * Check if SMAUG webservice is responding
 */
async function checkSmaug() {
  const client = await Smaug.health();
  if (client.statusCode !== 200) {
    throw Error('Smaug is not responding');
  }
}

