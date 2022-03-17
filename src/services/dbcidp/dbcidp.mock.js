/* eslint-disable */
/**
 * @file
 * Mocked responses from ForsRights
 */

export const MOCKED_POSITIVE_RESPONSE = {
    authenticated: true,
    rights: [
      { productName: 'INFOMEDIA',
        name: 'READ',
        description: 'Is allowed to read from INFOMEDIA' },
      { productName: 'DANBIB',
        name: 'READ',
        description: 'Is allowed to read from Danbib' }
    ]
};

export const MOCKED_NEGATIVE_RESPONSE = {
    authenticated: false,
    ressource: [
      { productName: 'INFOMEDIA',
        name: 'READ',
        description: 'Is allowed to read from INFOMEDIA' },
      { productName: 'NOT_DANBIB',
        name: 'READ',
        description: 'Is not allowed to read from Danbib' }
    ]
};

export const MOCKED_ERRONEOUS_RESPONSE = {
    error: 'user_not_found'
};
