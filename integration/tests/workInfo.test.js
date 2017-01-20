/* eslint no-undef: 0 */
import {assert} from 'chai';
import UpladPage from '../pages/upload.page';

describe('Testing url upload component', () => {
  const page = new UpladPage();
  beforeEach(() => {
    page.open();
    browser.selectUrlUpload();
  });


  it('Should show work information', () => {
    page.addUrls('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    const element = page.submitId(12345678).getText();
    assert.include(element, 'Titel');
    assert.include(element, 'Ophav');
    assert.include(element, 'Materiale type');
    assert.include(element, 'ISBN');
  });

  it('Should compare existing image with new image', () => {
    page.addUrls('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    page.submitId(12345678);
    const previewImage = browser.element('.preview-images').getText();
    assert.include(previewImage, 'Ny');
    assert.include(previewImage, 'Eksisterende');
  });
});
