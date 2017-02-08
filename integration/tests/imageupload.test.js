/* eslint no-undef: 0 */
import {assert} from 'chai';
import UploadPage from '../pages/upload.page';

describe('Testing image upload', () => {
  const page = new UploadPage();

  beforeEach(() => {
    browser.signIn();
    browser.selectImageUpload();
  });

  it('Should render component', () => {
    const element = $('.upload-form');
    element.waitForExist(5000);
    assert.include(element.getText(), 'Træk filer hertil');
  });

  it('Should show preview of image', () => {
    page.addImage('horses.jpg');
  });

  it('Should reject non image', () => {
    page.rejectImage('invalid_horse.txt');
    assert.include(browser.element('.message').getText(), 'BEMÆRK Følgende billeder kan ikke benyttes', 'error message is shown');
  });

  it('Should upload image', () => {
    page.addImage('horses.jpg');
    page.submitId('9788792813114');
    page.upload();
  });

  it('Should show overlay', () => {
    page.addImage('horses.jpg');
    page.submitId('9788792813114');
    page.upload();
    const overlay = page.getOverlay();
    assert.include(overlay.getText(), 'Upload er gennemført');
    browser.click('.modal button');
    assert.isTrue(page.overlayIsClosed());
  });

  it('Should fail image upload', () => {
    page.addImage('horses.jpg');
    page.submitId('06108466');
    page.upload('.error');
  });

});
