describe('ui-components', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textboxcomponent--primary'));

  it('should render the component', () => {
    cy.get('itg-text-box').should('exist');
  });
});
