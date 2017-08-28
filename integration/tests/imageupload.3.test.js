/* eslint no-undef: 0 */
import {assert} from 'chai';
import UploadPage from '../pages/upload.page';

describe('Testing image upload 3', () => {
  const page = new UploadPage();

  beforeEach(() => {
    browser.signIn();
    browser.selectImageUpload();
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
