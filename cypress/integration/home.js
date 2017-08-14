describe('Home', function() {
  beforeEach(function() {
    Cypress.config('baseUrl', 'http://localhost:4200');
    cy.visit('/');
  });

  it('should have a title NgTestingDemo', function() {
    cy
      .title().should('equal', 'NgTestingDemo');
  });

  it('should display a list of users on the home page', function() {
    cy
      .get('.panel-title')
      .should('have.length', 4);
      
    cy
      .get('.panel-title')
      .first().should('have.text', 'Jane');

    cy
      .get('.panel-title')
      .last().should('have.text', 'Bill');
  });
});
