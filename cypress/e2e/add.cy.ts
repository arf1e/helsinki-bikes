import { ERROR_COLOR_RGB } from '../test-constants';

describe('Entity Switch', () => {
  beforeEach(() => {
    cy.visit('/add');
  });

  it('sets new station form by default', () => {
    cy.get('[data-cy="add-station-form"]').should('be.visible');
    cy.get('[data-cy="add-journey-form"]').should('not.exist');
  });

  it('changes entities', () => {
    cy.get('[data-cy="add-station-form"]').should('be.visible');

    cy.get('[data-cy="option-add-journey"]').click();
    cy.get('[data-cy="add-station-form"]').should('not.exist');
    cy.get('[data-cy="add-journey-form"]').should('be.visible');

    cy.get('[data-cy="option-add-station"]').click();
    cy.get('[data-cy="add-journey-form"]').should('not.exist');
    cy.get('[data-cy="add-station-form"]').should('be.visible');
  });
});

describe('New Station Form', () => {
  beforeEach(() => {
    cy.visit('/add');
  });

  it('shows errors on unfilled required fields when trying to submit clean form', () => {
    cy.get('button[type="submit"]').click();

    cy.get('[data-cy="input-name"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.error:contains("Please enter the station name.")').should('be.visible');

    cy.get('[data-cy="input-address"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.error:contains("Please enter the station address.")').should('be.visible');

    cy.get('[data-cy="input-capacity"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.error:contains("Please enter station capacity.")').should('be.visible');

    cy.get('span.form-error:contains("Please choose station address from autocomplete list.")').should('be.visible');
  });

  it('shows errors on optional fields if the input is incorrect', () => {
    cy.get('[data-cy="input-city"]').type('123');
    cy.get('[data-cy="input-city"]').blur();
    cy.get('span.error:contains("City name is invalid.")').should('be.visible');

    cy.get('[data-cy="input-operator"]').type('123');
    cy.get('[data-cy="input-operator"]').blur();
    cy.get('span.error:contains("Operator is invalid.")').should('be.visible');
  });

  it('errors if capacity is not a positive number', () => {
    cy.get('[data-cy="input-capacity"]').type('invalid input');
    cy.get('[data-cy="input-capacity"]').blur();
    cy.get('span.error:contains("Capacity should be a positive number.")').should('be.visible');

    cy.get('[data-cy="input-capacity"]').clear();
    cy.get('[data-cy="input-capacity"]').type('-1');
    cy.get('[data-cy="input-capacity"]').blur();
    cy.get('span.error:contains("Capacity should be a positive number.")').should('be.visible');

    cy.get('[data-cy="input-capacity"]').clear();
    cy.get('[data-cy="input-capacity"]').type('001');
    cy.get('[data-cy="input-capacity"]').blur();
    cy.get('span.error:contains("Capacity should be a positive number.")').should('be.visible');
  });

  it('errors if user has entered the address but did not select an option from autocomplete', () => {
    cy.intercept('/lookup/autocomplete?*', { fixture: 'lookup-autocomplete-mock.json' }).as(
      'lookupAutocompleteApiMock',
    );
    cy.get('[data-cy="input-name"]').type('Test station');
    cy.get('[data-cy="input-capacity"]').type('12');
    cy.get('[data-cy="input-address"]').type('test');
    cy.get('[data-cy="input-address"]').blur();
    cy.get('button[type="submit"]').click();
    cy.get('span.form-error:contains("Please choose station address from autocomplete list.")').should('be.visible');
  });
});
