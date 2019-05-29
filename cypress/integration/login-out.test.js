/* eslint no-undef: 0 */

context('Testing login/-out functionalty', () => {
  it('Should login and redirect to /', () => {
    cy.signIn();
    cy.get('.upload-form').contains('Hvordan du vil');
    cy.url().should('match', /.*\/$/);
    cy.url().should('not.match', /.*login\/$/);
    cy.url().should('not.match', /.*login$/);
  });

  it('Should logout and redirect to /login', () => {
    cy.signIn();
    cy.get('#logout-btn').click();
    cy.url().should('match', /.*login$/);
  });

  it('Should reflect current authentication state', () => {
    cy.visit('/logout');
    cy.visit('/login');
    cy.request('/isauthenticated').then((response) => {
      expect(response.body).to.eq(false);
    });
    cy.signIn();
    cy.get('.upload-form').contains('Hvordan du vil');
    cy.request('/isauthenticated').then((response) => {
      expect(response.body).to.eq(true);
    });
  });
});
