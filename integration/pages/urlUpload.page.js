/* eslint no-undef: 0 */

export default class UrlUpladPage {
  open() {
    browser.signIn();
  }
  uploadUrls(url) {
    browser.setValue('.url-upload textarea', url);
    browser.click('.url-upload button');
    browser.waitForValue('.preview', 5000);
  }
  submitId(id) {
    browser.setValue('.id-input input', id);
    browser.click('.id-form button');
    browser.waitForValue('.work .title', 5000);
    return browser.element('.work');
  }
}
