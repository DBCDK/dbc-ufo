/* eslint no-undef: 0 */

context('Testing frontpage', () => {
  beforeEach(() => {
    cy.signIn();
    cy.selectImageUpload();
  });

  it('Should render frontpage', () => {
    cy.get('#content').contains('Træk filer hertil for at uploade');
  });
});
