/* eslint no-undef: 0 */
import {assert} from 'chai';
import path from 'path';

describe('Testing image upload', () => {
  beforeEach(() => {
    browser.url('/');
  });

  it('Should render component', () => {
    const element = $('.upload-form');
    element.waitForExist(5000);
    assert.include(element.getText(), 'Træk filer hertil');
  });

  it('Should show preview of image', () => {
    var toUpload = path.join(__dirname, 'assets', 'horses.jpg');
    browser.chooseFile('.dropzone input', toUpload);
    assert.include(browser.getValue('.dropzone input'), 'horses.jpg');
    assert.include(browser.getAttribute('.accepted img', 'alt'), 'horses.jpg');
  });

  it('Should reject small image', () => {
    var toUpload = path.join(__dirname, 'assets', 'horses_small.jpg');
    browser.chooseFile('.dropzone input', toUpload);
    assert.include(browser.element('.rejected').getText(), 'horses_small.jpg');
    assert.include(browser.element('.message.error').getText(), 'Filen har ikke en gyldig størrelse', 'error message is shown');
  });

  it('Should reject non image', () => {
    var toUpload = path.join(__dirname, 'assets', 'invalid_horse.txt');
    browser.chooseFile('.dropzone input', toUpload);
    assert.include(browser.element('.rejected').getText(), 'invalid_horse.txt');
    assert.include(browser.element('.message.error').getText(), 'Filen er ikke en gyldig type', 'error message is shown');
  });
});
