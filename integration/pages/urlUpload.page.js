export default class UrlUpladPage {
  open() {
    browser.url('/');
  }
  uploadUrls(url) {
    browser.setValue('.url-upload textarea', url);
    browser.click('.url-upload button');
    browser.waitForValue('.preview.component', 5000);
  }
  submitId(id) {
    browser.setValue('.id-form input', id);
    browser.click('.id-form button');
    browser.waitForValue('.work-preview', 5000);
    return browser.element('.work-preview');
  }
}