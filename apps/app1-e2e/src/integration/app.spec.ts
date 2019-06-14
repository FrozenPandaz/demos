import { getGreeting } from '../support/app.po';

import '@nx8-test/home';

describe('app1', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to app1!');
  });
});
