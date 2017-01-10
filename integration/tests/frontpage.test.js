import {assert} from 'chai';

describe('Testing frontpage', () => {
  beforeEach(() => {
    browser.url('/');
  });

  it('Should render frontpage', () => {
    const text = browser.getText('body');
    const expected = 'It\'s a bird...';
    assert.equal(text, expected);
  });
});
