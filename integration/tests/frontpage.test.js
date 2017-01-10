import {assert} from 'chai';

describe('Testing frontpage', () => {
  beforeEach(() => {
    browser.url('/'); // eslint-disable-line no-undef
  });

  it('Should render frontpage', () => {
    const text = browser.getText('body'); // eslint-disable-line no-undef
    const expected = 'It\'s a bird...';
    assert.equal(text, expected);
  });
});
