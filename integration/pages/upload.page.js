/* eslint no-undef: 0 */
import path from 'path';
import {assert} from 'chai';

export default class UploadPage {
  open() {
    browser.signIn();
  }

  addUrls(url) {
    browser.setValue('.url-upload textarea', url);
    browser.click('.url-upload button');
    browser.waitForValue('.preview', 5000);
  }

  addImage(image) {
    var toUpload = path.join(__dirname, '../tests/assets', image);
    browser.chooseFile('.dropzone input', toUpload);
    assert.include(browser.getValue('.dropzone input'), image);
    assert.include(browser.getAttribute('.accepted img', 'alt'), image);
  }

  rejectImage(image) {
    var toUpload = path.join(__dirname, '../tests/assets', image);
    browser.chooseFile('.dropzone input', toUpload);
    assert.include(browser.element('.rejected').getText(), image);
  }

  submitId(id) {
    browser.setValue('.id-input input', id);
    browser.click('.id-form button');
    browser.waitForValue('.work .title', 5000);
    return browser.element('.work');
  }

  rejectId(id) {
    browser.setValue('.id-input input', id);
    browser.click('.id-form button');
    browser.waitForValue('.status .error', 5000);
    return browser.element('.status');
  }

  upload(waitForClass = '.done') {
    browser.click('.upload-button button');
    browser.waitForValue(waitForClass, 5000);
  }
  getOverlay() {
    browser.waitForVisible('.overlay.open', 5000);
    return browser.element('.modal');
  }
  overlayIsClosed() {
    browser.pause(600);
    return browser.elements('.overlay.open').value.length === 0;
  }
}
