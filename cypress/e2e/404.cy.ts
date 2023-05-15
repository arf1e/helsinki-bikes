describe('404 Page', () => {
  it('shows 404 page if user tries to reach unknown page', () => {
    cy.visit('/does-not-exist', { failOnStatusCode: false });
    cy.get('h1.code').should('be.visible');
    cy.get('a.redirect').should('be.visible');
    cy.get('a.redirect').click();
    cy.intercept('/journeys?*', { fixture: 'journeys-mock.json' }).as('journeysApiMock');
    cy.url().should('include', '/journeys');
  });
});
