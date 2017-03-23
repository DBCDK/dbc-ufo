/**
 * @file
 * Config mapper that maps environment variables to the exportet CONFIG object.
 * A validateConfig method that validates the values found in the CONFIG object and throws an Error upon invalid values.
 */


export const CONFIG = {
  app: {
    env: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    name: process.env.APP_NAME || 'no name'
  },
  forsrights: {
    uri: process.env.FORS_RIGHTS_URI
  },
  moreinfo_update: {
    uri: process.env.MOREINFO_UPDATE_URI
  },
  log: {
    level: process.env.LOG_LEVEL,
    pretty: process.env.PRETTY_LOG === '1'
  },
  mock_externals: {
    smaug: process.env.MOCK_SMAUG === '1',
    forsrights: process.env.MOCK_FORS_RIGHTS === '1',
    moreinfo_update: process.env.MOCK_MOREINFO_UPDATE === '1'
  },
  openplatform: {
    serviceprovider: {
      uri: process.env.SERVICE_PROVIDER_URI
    },
    smaug: {
      uri: process.env.SMAUG_URI,
      client_id: process.env.SMAUG_CLIENT_ID,
      client_secret: process.env.SMAUG_CLIENT_SECRET
    }
  },
  session: {
    key: process.env.SESSION_REDIS_KEY,
    port: process.env.SESSION_REDIS_PORT || '6379',
    host: process.env.SESSION_REDIS_HOST || '127.0.0.1'
  }
};

/**
 * Recursive functon that validates that all params in the above CONFIG object is set.
 * Number are validated to be non-NaN numbers.
 *
 * @param {Object} config
 * @param {string} k String used for printing out which config param is missing
 */
export function validateConfig(config = CONFIG, k = '') {
  for (const key in config) {
    if (typeof config[key] === 'object') {
      validateConfig(config[key], `${k}${key}.`);
    }
    else {
      if (config[key] === undefined) { // eslint-disable-line no-undefined
        throw Error(`${k}${key} was not specified in config. See https://github.com/DBCDK/hejmdal#environment-variabler for a list of environment variables and take a look at https://github.com/DBCDK/hejmdal/blob/master/src/utils/config.util.js to see how they're mapped`); // eslint-disable-line max-len
      }
      if (typeof config[key] === 'number' && Number.isNaN(config[key])) {
        throw Error(`${k}${key}: expected NaN to be a number. See https://github.com/DBCDK/hejmdal#environment-variabler for a list of environment variables and take a look at https://github.com/DBCDK/hejmdal/blob/master/src/utils/config.util.js to see how they're mapped`); // eslint-disable-line max-len
      }
    }
  }
}
