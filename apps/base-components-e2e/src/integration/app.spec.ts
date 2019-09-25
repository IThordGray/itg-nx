import { getGreeting } from '../support/app.po';

describe('base-components', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to base-components!');
  });
});
