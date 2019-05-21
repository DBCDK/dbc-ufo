import 'cypress-file-upload';

Cypress.Commands.add('signIn', () => {
  cy.visit('/login');
  cy.get('#login-input-user').clear().type(Cypress.env('FORS_RIGHTS_URI_TEST_USER'));
  cy.get('#login-input-agency').clear().type(Cypress.env('FORS_RIGHTS_URI_TEST_AGENCY'));
  cy.get('#login-input-password').clear().type(Cypress.env('FORS_RIGHTS_URI_TEST_PASSWORD'));
  cy.get('#login-input-tac').click();
  cy.get('#login-input-submit').click();
  cy.get('#content .upload-select', {timeout:2000}).should('contain', 'Hvordan du vil');
  cy.wait(500);
});

Cypress.Commands.add('selectImageUpload', () => {
  cy.get('#select-image-upload').click();
  cy.get('#content .image-upload-header').should('exist');
});

Cypress.Commands.add('selectUrlUpload', () => {
  cy.get('#select-url-upload').click();
  cy.get('#content .url-upload-header').should('exist');
});

Cypress.Commands.add('addUrl', (url) => {
  cy.get('.url-upload textarea').type(url);
  cy.get('.url-upload button').click();
});

Cypress.Commands.add('submitId', (id, index = 0) => {
  cy.get('.id-input input').eq(index).type(id);
  cy.get('.id-form button').eq(index).click();
});

Cypress.Commands.add('addImage', (fileName) => {
  cy.fixture(fileName).then(fileContent => {
    cy.get('input[type=file]').upload(
        { fileContent, fileName, mimeType: 'image/jpeg' },
        { subjectType: 'input' },
    );
  });
});

Cypress.Commands.add('uploadItem', (waitForClass = '.done') => {
  cy.get('.upload-button button').click();
  cy.get(waitForClass, {timeout: 10000}).should('exist');
});

