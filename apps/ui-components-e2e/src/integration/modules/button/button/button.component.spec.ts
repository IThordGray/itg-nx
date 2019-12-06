describe('ui-components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--primary'));

  it('should render the component', () => {
    cy.get('itg-button').should('exist');
  });

  it('should render the component2', () => {
    cy.get('itg-button').should('exist');
    cy.get('itg-button').should('exist');
    cy.get('itg-button').should('exist');
    cy.get('itg-button').should('e2xist');
  });
});
