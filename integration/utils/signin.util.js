/* eslint-disable no-undef */
/**
 * @file
 * Utility methods for easy sign in when testing the ui
 */

/**
 * Signs in the "user"
 */
browser.signIn = () => {
  browser.url('/login');
  browser.setValue('#login-input-agency', 'somevalue');
  browser.setValue('#login-input-user', 'somevalue');
  browser.setValue('#login-input-password', 'somevalue');
  browser.click('#login-input-tac');
  browser.click('#login-input-submit');
  browser.pause(300);
};
