import { getGreeting } from '../support/app.po';

describe('itg', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to itg!');
  });
});
