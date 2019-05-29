/* eslint no-undef: 0 */

context('Testing url upload component', () => {
  beforeEach(() => {
    cy.signIn();
    cy.selectUrlUpload();
  });

  it('Should render component', () => {
    cy.get('.url-upload-header').should('contain', 'Upload af URL\'er');
    cy.get('.url-upload').should('contain', 'Hent preview af billeder');
    cy.get('.url-upload textarea').should('have.attr', 'placeholder', 'Skriv en URL pr. linie');
  });

  it('Should show preview of image from url', () => {
    cy.addUrl('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    cy.get('.preview-images img').invoke('attr', 'alt').should('include', 'horses-grazing-on-ranch.jpg');
  });

  it('Remove image from list', () => {
    cy.get('.preview-images').should('have.length', 0);
    cy.addUrl('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    cy.get('.preview-images').should('have.length', 1);
    cy.get('.remove').click();
    cy.get('.preview-images').should('have.length', 0);
  });

  it('Should reject non image', () => {
    cy.addUrl('https://not-an-image.dk');
    cy.get('.preview.error .preview-error--content .message', {timeout: 30000}).should('contain', 'Fejl');
    cy.get('.preview.error .preview-error--content .message').should('contain', 'Ugyldig billedurl');
  });

  it('Remove rejected from list', () => {
    cy.get('.preview.error').should('have.length', 0);
    cy.addUrl('not_an_image');
    cy.get('.preview.error', {timeout: 20000}).should('have.length', 1);
    cy.get('.remove').click();
    cy.get('.preview.error').should('have.length', 0);
  });

  it('Only unique elements are parsed', () => {
    cy.addUrl('not_unique\nnot_unique');
    cy.get('.preview.error', {timeout: 20000}).should('have.length', 1);
  });

  it('Should upload url', () => {
    cy.addUrl('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    cy.submitId('9788792813114');
    cy.uploadItem();
    cy.get('.modal').should('contain', 'Upload er gennemført');
    cy.get('.modal').should('contain', '1 fil blev oploadet');
  });

  it('Should fail url upload', () => {
    cy.addUrl('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    cy.submitId('11111111');
    cy.uploadItem('.error');
    cy.get('.modal .message').should('contain', 'Der var fejl i 1 fil.');
  });

});
