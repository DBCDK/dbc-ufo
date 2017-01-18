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
  browser.setValue('#login-input-agency', process.env.FORS_RIGHTS_URI_TEST_AGENCY);
  browser.setValue('#login-input-user', process.env.FORS_RIGHTS_URI_TEST_USER);
  browser.setValue('#login-input-password', process.env.FORS_RIGHTS_URI_TEST_PASSWORD);
  browser.click('#login-input-tac');
  browser.click('#login-input-submit');
  browser.pause(300);
};
