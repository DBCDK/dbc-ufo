/* eslint no-undef: 0 */
import {assert} from 'chai';
import UploadPage from '../pages/upload.page';

describe('Testing image upload ', () => {
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
    page.clearAlert();
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
    page.submitId('11111111');
    page.upload('.upload-errors');
    page.clearAlert();
  });

  it('Should activate submit button when all images are ready', () => {
    page.addImage('horses.jpg');
    page.addImage('horses2.jpg');
    assert.equal(browser.elements('.preview').value.length, 2);
    page.submitId('9788792813114', 0);
    page.submitId('9788792813114', 1);
    page.upload();
    const overlay = page.getOverlay();
    assert.include(overlay.getText(), 'Upload er gennemført');
    overlay.click('button');
  });
});
