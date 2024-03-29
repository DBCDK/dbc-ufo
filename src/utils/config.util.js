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
  dbcidp: {
    uri: process.env.DBC_IDP_URI
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
    dbcidp: process.env.MOCK_DBC_IDP === '1',
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
    key: process.env.SESSION_KEY
  },
  upload: {
    max_file_size: process.env.MAX_FILE_SIZE || 50000000
  }
};

if (process.env.REDIS_CLUSTER_HOST) {
  CONFIG.session.redis = {
    host: process.env.REDIS_CLUSTER_HOST,
    port: process.env.REDIS_PORT || 6379
  };
}
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
        throw Error(
          `${k}${key} was not specified in config. See https://github.com/DBCDK/dbc-ufo#environment-variabler for a list of environment variables and take a look at https://github.com/DBCDK/dbc-ufo/blob/master/src/utils/config.util.js to see how they're mapped` // eslint-disable-line max-len
        );
      }
      if (typeof config[key] === 'number' && Number.isNaN(config[key])) {
        throw Error(
          `${k}${key}: expected NaN to be a number. See https://github.com/DBCDK/dbc-ufo#environment-variabler for a list of environment variables and take a look at https://github.com/DBCDK/dbc-ufo/blob/master/src/utils/config.util.js to see how they're mapped` // eslint-disable-line max-len
        );
      }
    }
  }
}
