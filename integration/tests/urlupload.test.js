/* eslint no-undef: 0 */
import {assert} from 'chai';
import UrlUpladPage from '../pages/urlUpload.page';

describe('Testing url upload component', () => {
  const page = new UrlUpladPage();
  beforeEach(() => {
    page.open();
  });

  it('Should render component', () => {
    const element = $('.url-upload');
    element.waitForExist(5000);
    assert.include(element.getText(), 'HENT PREVIEW AF BILLEDER');
  });

  it('Should show preview of image from url', () => {
    page.uploadUrls('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    assert.include(browser.getAttribute('.preview-images img', 'alt'), 'horses-grazing-on-ranch.jpg');
  });

  it('Should reject non image', () => {
    page.uploadUrls('https://not-an-image');
    assert.include(browser.element('.preview.error').getText(), 'not-an-image');
  });

  it('Remove image from list', () => {
    page.uploadUrls('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    assert.equal(browser.elements('.preview-images').value.length, 1);
    browser.click('.remove');
    assert.equal(browser.elements('.preview-images').value.length, 0);
  });
  it('Remove rejected from list', () => {
    page.uploadUrls('not_an_image');
    assert.equal(browser.elements('.preview.error').value.length, 1);
    browser.click('.remove');
    assert.equal(browser.elements('.preview.error').value.length, 0);
  });

  it('Only unique elements are parsed', () => {
    page.uploadUrls('not_unique\nnot_unique');
    assert.equal(browser.elements('.preview.error').value.length, 1);
  });
});
