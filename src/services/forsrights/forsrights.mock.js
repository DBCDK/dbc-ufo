/* eslint-disable */
/**
 * @file
 * Mocked responses from ForsRights
 */

export const MOCKED_POSITIVE_RESPONSE = {
  forsRightsResponse: {
    ressource: [
      {
        name: {'$': 'netpunkt.dk', '@': 'fr'},
        right: [{'$': '500', '@': 'fr'}]
      }
    ],
    '@': 'fr'
  },
  '@namespaces': {fr: 'http://oss.dbc.dk/ns/forsrights'}
};

export const MOCKED_NEGATIVE_RESPONSE = {
  forsRightsResponse: {
    ressource: [
      {
        name: {'$': 'duer-ikk', '@': 'fr'},
        right: [{'$': '400', '@': 'fr'}]
      }
    ],
    '@': 'fr'
  },
  '@namespaces': {fr: 'http://oss.dbc.dk/ns/forsrights'}
};

export const MOCKED_ERRONEOUS_RESPONSE = {
  forsRightsResponse: {
    error: {'$': 'user_not_found', '@': 'fr'},
    '@': 'fr'
  },
  '@namespaces': {fr: 'http:\/\/oss.dbc.dk\/ns\/forsrights'}
};
