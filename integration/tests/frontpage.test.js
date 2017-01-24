/* eslint-disable no-undef */
import {assert} from 'chai';

describe('Testing frontpage', () => {
  beforeEach(() => {
    browser.signIn();
    browser.selectImageUpload();
  });

  it('Should render frontpage', () => {
    const text = browser.getText('#content');
    const expected = 'Træk filer hertil for at uploade';
    assert.include(text, expected);
  });
});
