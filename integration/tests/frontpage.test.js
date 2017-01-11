import {assert} from 'chai';

describe('Testing frontpage', () => {
  beforeEach(() => {
    browser.url('/'); // eslint-disable-line no-undef
  });

  it('Should render frontpage', () => {
    const text = browser.getText('#content'); // eslint-disable-line no-undef
    const expected = 'Træk filer hertil for at uploade';
    assert.include(text, expected);
  });
});
