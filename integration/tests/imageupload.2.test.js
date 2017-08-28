/* eslint no-undef: 0 */
import {assert} from 'chai';
import UploadPage from '../pages/upload.page';

describe('Testing image upload 2', () => {
  const page = new UploadPage();

  beforeEach(() => {
    browser.signIn();
    browser.selectImageUpload();
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
});
