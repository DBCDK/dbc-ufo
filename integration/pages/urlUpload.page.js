export default class UrlUpladPage {
  open() {
    browser.url('/');
  }
  uploadUrls(url) {
    browser.setValue('.url-upload textarea', url);
    browser.click('.url-upload button');
    browser.waitForValue('.preview.component', 5000);
  }
}