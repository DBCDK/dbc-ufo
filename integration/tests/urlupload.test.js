/* eslint no-undef: 0 */
import {assert} from 'chai';

describe('Testing url upload component', () => {
  beforeEach(() => {
    browser.url('/');
  });

  it('Should render component', () => {
    const element = $('.upload-urls-container');
    element.waitForExist(5000);
    assert.include(element.getText(), 'vis i liste');
  });

  it('Should show preview of image from url', () => {
    browser.setValue('.url-upload textarea', 'https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    browser.click('.url-upload button');
    browser.waitForValue('.urls-accepted img', 5000);
    assert.include(browser.getAttribute('.urls-accepted img', 'alt'), 'horses-grazing-on-ranch.jpg');
  });

  it('Should reject non image', () => {
    browser.setValue('.url-upload textarea', 'https://not-an-image');
    browser.click('.url-upload button');
    browser.waitForValue('.urls-rejected', 5000);
    assert.include(browser.element('.rejected-url').getText(), 'not-an-image');
  });
});
