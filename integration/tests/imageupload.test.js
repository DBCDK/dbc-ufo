/* eslint no-undef: 0 */
import {assert} from 'chai';
import uploadPage from '../pages/upload.page';

describe('Testing image upload', () => {
  const page = new uploadPage();

  beforeEach(() => {
    browser.signIn();
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
    assert.include(browser.element('.message.error').getText(), 'Filen har ikke en gyldig størrelse', 'error message is shown');
  });

  it('Should reject non image', () => {
    page.rejectImage('invalid_horse.txt');
    assert.include(browser.element('.message.error').getText(), 'Filen er ikke en gyldig type', 'error message is shown');
  });

  it('Should upload image', () => {
    page.addImage('horses.jpg');
    page.submitId(12345678);
    page.upload();
  });
});
