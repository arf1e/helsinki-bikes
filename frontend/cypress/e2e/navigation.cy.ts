describe('Navigation', () => {
  it('redirects to the journeys page by default', () => {
    cy.visit('/');
    cy.url().should('include', '/journeys');
  });

  it('navigates to pages using navigation links', () => {
    cy.visit('/journeys');
    cy.get('a[href="/stations"]').click();
    cy.url().should('include', '/stations');

    cy.get('a[href="/add"]').click();
    cy.url().should('include', '/add');
  });
});
