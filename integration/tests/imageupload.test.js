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

  it('Should reject small image', () => {
    page.rejectImage('horses_small.jpg');
    assert.include(browser.element('.message').getText(), 'Filen har ikke en gyldig størrelse', 'error message is shown');
  });

  it('Should reject non image', () => {
    page.rejectImage('invalid_horse.txt');
    assert.include(browser.element('.message').getText(), 'Filen er ikke en gyldig type', 'error message is shown');
  });

  it('Should upload image', () => {
    page.addImage('horses.jpg');
    page.submitId('9788792813114');
    page.upload();
  });
  it('Should fail image upload', () => {
    page.addImage('horses.jpg');
    page.submitId('06108466');
    page.upload('.error');
  });
});
