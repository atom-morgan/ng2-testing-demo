describe('Home', function() {
  beforeEach(function() {
    Cypress.config('baseUrl', 'http://localhost:4200');
    cy.visit('/user/1');
  });

  it('should go back to home when the navbar title is clicked', function() {
    cy
      .get('.navbar-brand')
      .click()
      .url().should('equal', 'http://localhost:4200/');
  });
});
