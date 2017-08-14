describe('User profile', function() {
  beforeEach(function() {
    Cypress.config('baseUrl', 'http://localhost:4200');
    cy.visit('/');
  });

  it('should display an individual user\'s details in the profile page', function() {
    cy
      .get('.panel-title a')
      .first()
      .click();

    cy
      .url().should('contain', '/user/1');

    cy
      .get('.panel-title')
      .should('have.text', 'Jane');
  });
});
