/* eslint no-undef: 0 */
import {assert} from 'chai';
import UrlUpladPage from '../pages/urlUpload.page';

describe('Testing url upload component', () => {
  const page = new UrlUpladPage();
  beforeEach(() => {
    page.open();
  });

  it('Should render component', () => {
    const element = $('.upload-urls-container');
    element.waitForExist(5000);
    assert.include(element.getText(), 'VIS I LISTE');
  });

  it('Should show preview of image from url', () => {
    page.uploadUrls('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    assert.include(browser.getAttribute('.preview-image img', 'alt'), 'horses-grazing-on-ranch.jpg');
  });

  it('Should reject non image', () => {
    page.uploadUrls('https://not-an-image');
    assert.include(browser.element('.preview.rejected').getText(), 'not-an-image');
  });

  it('Remove image from list', () => {
    page.uploadUrls('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    assert.equal(browser.elements('.preview-image').value.length, 1);
    browser.click('button.remove');
    assert.equal(browser.elements('.preview-image').value.length, 0);
  });
  it('Remove rejected from list', () => {
    page.uploadUrls('not_an_image');
    assert.equal(browser.elements('.preview.rejected').value.length, 1);
    browser.click('button.remove');
    assert.equal(browser.elements('.preview.rejected').value.length, 0);
  });

  it('Only unique elements are parsed', () => {
    page.uploadUrls('not_unique\nnot_unique');
    assert.equal(browser.elements('.preview.rejected').value.length, 1);
  });
});
