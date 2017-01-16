/* eslint no-undef: 0 */
import {assert} from 'chai';
import UrlUpladPage from '../pages/urlUpload.page';

describe('Testing url upload component', () => {
  const page = new UrlUpladPage();
  beforeEach(() => {
    page.open();
  });


  it('Should show work information', () => {
    page.uploadUrls('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    const element = page.submitId(1234).getText();
    assert.include(element, 'Titel');
    assert.include(element, 'Ophav');
    assert.include(element, 'Materiale type');
    assert.include(element, 'ISBN');
  });

  it('Should compare existing image with new image', () => {
    page.uploadUrls('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    page.submitId(1234);
    const previewImage = browser.element('.preview-image').getText();
    assert.include(previewImage, 'Ny');
    assert.include(previewImage, 'Eksisterende');
  });

});
