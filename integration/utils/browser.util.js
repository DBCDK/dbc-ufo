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
  browser.pause(200);
  browser.setValue('#login-input-agency', process.env.FORS_RIGHTS_URI_TEST_AGENCY);
  browser.setValue('#login-input-user', process.env.FORS_RIGHTS_URI_TEST_USER);
  browser.setValue('#login-input-password', process.env.FORS_RIGHTS_URI_TEST_PASSWORD);
  browser.click('#login-input-tac');
  browser.waitForEnabled('#login-input-submit');
  browser.click('#login-input-submit');
  browser.waitForVisible('#logout-btn');
};

browser.selectImageUpload = () => {
  browser.waitForVisible('#select-image-upload', 1000);
  browser.click('#select-image-upload');
  browser.waitForVisible('#select-image-upload', 1000, true);
};

browser.selectUrlUpload = () => {
  browser.waitForVisible('#select-url-upload', 1000);
  browser.click('#select-url-upload');
  browser.waitForVisible('#select-url-upload', 1000, true);
};

browser.elementByIndex = (selector, index) => {
  return browser.elements(selector).value[index];
};
