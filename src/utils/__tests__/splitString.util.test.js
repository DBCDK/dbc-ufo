/**
 * @file
 * Unittesting methods in splitString.util.js
 */

import {assert} from 'chai';
import splitString from '../splitString.util';

describe('Unittesting splitString.util.js', () => {

  it('Should return id and url with tab split', () => {
    const test = '870970-basis:28643713\thttp://www.cphhalf.dk/wp-content/themes/cphhalf/images/half-logo-clean.png';
    const expected = {
      url: 'http://www.cphhalf.dk/wp-content/themes/cphhalf/images/half-logo-clean.png',
      id: '870970-basis:28643713'
    };
    assert.deepEqual(splitString(test), expected);
  });

  it('Should return id and url with space split', () => {
    const test = '870970-basis:28643713 http://www.cphhalf.dk/wp-content/themes/cphhalf/images/half-logo-clean.png';
    const expected = {
      url: 'http://www.cphhalf.dk/wp-content/themes/cphhalf/images/half-logo-clean.png',
      id: '870970-basis:28643713'
    };
    assert.deepEqual(splitString(test), expected);
  });

  it('Should return url and no ID', () => {
    const test = 'http://www.cphhalf.dk/wp-content/themes/cphhalf/images/half-logo-clean.png';
    const expected = {
      url: 'http://www.cphhalf.dk/wp-content/themes/cphhalf/images/half-logo-clean.png',
      id: ''
    };
    assert.deepEqual(splitString(test), expected);
  });

  it('Should return no url', () => {
    const test = 'not_a_valid_string';
    assert.equal(splitString(test).url, '');
  });
});
