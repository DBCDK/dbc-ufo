/* eslint-disable no-undef */
import {assert} from 'chai';

describe('Testing login/-out functionalty', () => {
  it('Should login and redirect to /', () => {
    browser.url('/login');
    browser.pause(200);
    browser.setValue('#login-input-agency', process.env.FORS_RIGHTS_URI_TEST_AGENCY);
    browser.setValue('#login-input-user', process.env.FORS_RIGHTS_URI_TEST_USER);
    browser.setValue('#login-input-password', process.env.FORS_RIGHTS_URI_TEST_PASSWORD);
    browser.click('#login-input-tac');
    browser.waitForEnabled('#login-input-submit');
    browser.click('#login-input-submit');
    browser.pause(500);

    const url = browser.getUrl();

    assert.isTrue(url.endsWith('/'));
    assert.isFalse(url.endsWith('login/'));
  });

  it('Should logout and redirect to /login', () => {
    browser.signIn();
    browser.click('#logout-btn');
    const url = browser.getUrl();
    assert.isTrue(url.endsWith('/login'));
  });

  it('Should reflect current autication state', () => {
    browser.url('/logout');
    browser.url('/isauthenticated');

    assert.equal(browser.getText('body'), 'false');
    browser.signIn();
    browser.url('/isauthenticated');
    assert.equal(browser.getText('body'), 'true');
  });
});
