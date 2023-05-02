describe('Navigation', () => {
  it('should redirect to the journeys page by default', () => {
    cy.visit('/');
    cy.url().should('include', '/journeys');
  });

  it('should navigate to pages using navigation links', () => {
    cy.visit('/journeys');
    cy.get('a[href="/stations"]').click();
    cy.url().should('include', '/stations');

    cy.get('a[href="/add"]').click();
    cy.url().should('include', '/add');
  });
});
