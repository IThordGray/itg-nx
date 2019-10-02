import { getGreeting } from '../support/app.po';

describe('logger-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to logger-app!');
  });
});
