/* eslint no-undef: 0 */

context('Testing image upload', () => {
  beforeEach(() => {
    cy.signIn();
    cy.selectImageUpload();
  });

  it('Should render component', () => {
    cy.get('#content').contains('Træk filer hertil for at uploade');
  });

  it('Should show preview of image', () => {
    cy.get('.dropzone input').should('exist');
    const image = 'horses.jpg';
    cy.addImage(image);
    cy.get('.accepted img').should('contain.attr', 'alt', image);
  });

  it('Should reject non image', () => {
    const image = 'invalid_horse.txt';
    cy.addImage(image);
    cy.get('.rejected').should('contain', image);
    cy.get('.message').then(($msg) => {
      expect($msg.text().toUpperCase()).to.contain('BEMÆRK');
    });
    cy.get('.message').should('contain', 'Følgende billeder kan ikke benyttes');
  });

  it('Should reject to small image', () => {
    const image = 'horses_500x500.jpg';
    cy.addImage(image);
    cy.get('.rejected').should('contain', image);
    cy.get('.message').then(($msg) => {
      expect($msg.text().toUpperCase()).to.contain('BEMÆRK');
    });
    cy.get('.message').should('contain', 'Følgende billeder kan ikke benyttes');
    cy.get('.preview.error .message').should('contain', 'Billedet er for lille');
  });

  it('Should accept 501x501 pixel image', () => {
    const image = 'horses_501x501.jpg';
    cy.addImage(image);
    cy.get('.accepted img').should('contain.attr', 'alt', image);
  });

  it('Should upload image', () => {
    cy.addImage('horses.jpg');
    cy.submitId('9788792813114');
    cy.get('.preview-status .description').should('contain', 'Klar til upload');
    cy.uploadItem();
  });

  it('Should show overlay', () => {
    cy.addImage('horses.jpg');
    cy.submitId('9788792813114');
    cy.uploadItem();
    cy.get('.modal').should('contain', 'Upload er gennemført');
    cy.get('.modal').should('contain', '1 fil blev oploadet');
    cy.get('.modal').should('be.visible');
    cy.get('.modal-close button').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('Should fail image upload', () => {
    cy.addImage('horses.jpg');
    cy.submitId('11111111');
    cy.uploadItem('.upload-errors');
    cy.get('.modal .message').then(($msg) => {
      expect($msg.text().toUpperCase()).to.contain('BEMÆRK');
    });
    cy.get('.modal .message').should('contain', 'Der var fejl i 1 fil.');
  });

  it('Should activate submit button when all images are ready', () => {
    cy.addImage('horses.jpg');
    const image = 'horses2.jpg';
    cy.addImage(image);
    cy.get('.preview').should('have.length', 2);
    cy.get('.images img').eq(1).should('contain.attr', 'alt', image);
    cy.submitId('9788792813114', 0);
    cy.get('.preview-status .description').eq(0).should('contain', 'Klar til upload');
    cy.submitId('9788792813114', 1);
    cy.get('.preview-status .description').eq(1).should('contain', 'Klar til upload');
    cy.wait(500);
    cy.uploadItem();
    cy.get('.modal').should('contain', 'Upload er gennemført');
    cy.get('.modal').should('contain', '2 filer blev oploadet');
  });

});
