/**
 * @file
 * Unittesting methods in dbcidp.client
 */

import {assert} from 'chai';
import * as DbcIdp from '../dbcidp.client.js';
import {MOCKED_POSITIVE_RESPONSE, MOCKED_NEGATIVE_RESPONSE, MOCKED_ERRONEOUS_RESPONSE} from '../dbcidp.mock';

describe('Unittesting methods in dbcidp.client', () => {

  it('Should return authenticated response', () => {
    const result = DbcIdp.parseResponseFromDbcIdp(MOCKED_POSITIVE_RESPONSE);
    assert.deepEqual(result, {error: null, authenticated: true});
  });

  it('Should return non-authenticated response', () => {
    const result = DbcIdp.parseResponseFromDbcIdp(MOCKED_NEGATIVE_RESPONSE);
    assert.deepEqual(result, {error: 'Could not authenticate user', authenticated: false});
  });

  it('Should return erroneous response', () => {
    const result = DbcIdp.parseResponseFromDbcIdp(MOCKED_ERRONEOUS_RESPONSE);
    assert.deepEqual(result, {error: 'user_not_found', authenticated: false});
  });
});
