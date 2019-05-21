/* eslint no-undef: 0 */

context('Testing url upload component', () => {
  beforeEach(() => {
    cy.signIn();
    cy.selectUrlUpload();
  });

  it('Should show work information', () => {
    cy.addUrl('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    cy.submitId('9788792813114');
    cy.get('.work.component .title', {timeout:10000}).should('contain', 'God hund, slem hund');
    cy.get('.work.component .creator', {timeout:10000}).should('contain', 'Erling Bugge');
    cy.get('.work.component .type', {timeout:10000}).should('contain', 'Bog');
    cy.get('.work.component .isbn', {timeout:10000}).should('contain', '9788792813114');
  });

  it('Should compare existing image with new image', () => {
    cy.addUrl('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    cy.submitId('9788792813114');
    cy.get('.preview-images', {timeout:10000}).should('contain', 'Ny');
    cy.get('.preview-images', {timeout:10000}).should('contain', 'Eksisterende');
  });

  it('Should show wrong ID Error', () => {
    cy.addUrl('https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg');
    cy.submitId('9788792813119');
    cy.get('.status .description').should('contain', 'Ugyldigt ID');
  });

});
