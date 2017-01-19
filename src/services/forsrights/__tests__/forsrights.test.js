/**
 * @file
 * Unittesting methods in forsrights.client
 */

import {assert} from 'chai';
import * as ForsRights from '../forsrights.client.js';
import {MOCKED_POSITIVE_RESPONSE, MOCKED_NEGATIVE_RESPONSE, MOCKED_ERRONEOUS_RESPONSE} from '../forsrights.mock';

describe('Unittesting methods in forsrights.client', () => {

  it('Should return authenticated response', () => {
    const result = ForsRights.parseResponseFromForsRights(MOCKED_POSITIVE_RESPONSE);
    assert.deepEqual(result, {error: null, authenticated: true});
  });

  it('Should return non-authenticated response', () => {
    const result = ForsRights.parseResponseFromForsRights(MOCKED_NEGATIVE_RESPONSE);
    assert.deepEqual(result, {error: null, authenticated: false});
  });

  it('Should return erroneous response', () => {
    const result = ForsRights.parseResponseFromForsRights(MOCKED_ERRONEOUS_RESPONSE);
    assert.deepEqual(result, {error: 'user_not_found', authenticated: false});
  });
});
