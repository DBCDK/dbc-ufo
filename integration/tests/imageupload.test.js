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
    page.upload('.upload-errors');
  });

  it('Should reset state', () => {
    page.addImage('horses.jpg');
    page.addImage('horses2.jpg');
    assert.equal(browser.elements('.preview').value.length, 2);
    page.submitId('9788792813114');
    page.upload();
    const overlay = page.getOverlay();
    overlay.click('.overlay-reset');
    // Make sure overlay is closed.
    browser.pause(600);
    assert.equal(browser.elements('.preview').value.length, 0);
    // Upload image again to make sure old state is removed.
    browser.selectImageUpload();
    page.addImage('horses.jpg');
    assert.equal(browser.elements('.preview').value.length, 1);
  });

});
