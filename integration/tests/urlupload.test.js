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
    browser.waitForValue('.preview-image', 5000);
    assert.include(browser.getAttribute('.preview-image img', 'alt'), 'horses-grazing-on-ranch.jpg');
  });

  it('Should reject non image', () => {
    browser.setValue('.url-upload textarea', 'https://not-an-image');
    browser.click('.url-upload button');
    browser.waitForValue('.preview.rejected', 5000);
    assert.include(browser.element('.preview.rejected').getText(), 'not-an-image');
  });

  it('Remove image from list', () => {
    browser.setValue('.url-upload textarea', 'https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    browser.click('.url-upload button');
    browser.waitForValue('.preview.accepted', 5000);
    assert.equal(browser.elements('.preview-image').value.length, 1);
    browser.click('.button.remove');
    assert.equal(browser.elements('.preview-image').value.length, 0);
  });
  it('Remove rejected from list', () => {
    browser.setValue('.url-upload textarea', 'not_an_image');
    browser.click('.url-upload button');
    browser.waitForValue('.preview.rejected', 5000);
    assert.equal(browser.elements('.preview.rejected').value.length, 1);
    browser.click('.button.remove');
    assert.equal(browser.elements('.preview.rejected').value.length, 0);
  });

  it('Only unique elements are parsed', () => {
    browser.setValue('.url-upload textarea', 'not_unique\nnot_unique');
    browser.click('.url-upload button');
    browser.waitForValue('.preview.rejected', 5000);
    assert.equal(browser.elements('.preview.rejected').value.length, 1);
  });
});
