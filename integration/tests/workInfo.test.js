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
    const element = page.submitId('9788792813114').getText();
    assert.include(element, 'God hund, slem hund');
    assert.include(element, 'Erling Bugge');
    assert.include(element, 'Bog');
    assert.include(element, '9788792813114');
  });

  it('Should show wrong ID Error', () => {
    page.addUrls('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    const element = page.rejectId('9788792813119').getText();
    assert.include(element, 'ugyldigt ID');
  });

  it('Should compare existing image with new image', () => {
    page.addUrls('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    page.submitId('9788792813114');
    const previewImage = browser.element('.preview-images').getText();
    assert.include(previewImage, 'Ny');
    assert.include(previewImage, 'Eksisterende');
  });
});
