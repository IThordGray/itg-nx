import { getGreeting } from '../support/app.po';

describe('digitwin-simulator', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to digitwin-simulator!');
  });
});
