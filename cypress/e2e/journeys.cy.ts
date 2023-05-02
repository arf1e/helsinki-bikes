const ERROR_COLOR_RGB = 'rgb(255, 98, 107)';
const ACTIVE_COLOR_RGB = 'rgb(98, 104, 255)';

describe('Journeys Form', () => {
  beforeEach(() => {
    cy.visit('/journeys');
    cy.intercept('GET', '**/journeys?*', { fixture: 'journeys-mock.json' }).as('rootJourneysMock');
  });

  it('sends correct request on submit', () => {
    const departureStationInput = cy.get('input[name="departureStationName"]');
    departureStationInput.type('test departure station');
    cy.intercept('GET', '**/journeys?*', []).as('getJourneys');
    cy.get('button[type="submit"]').click();
    cy.wait('@getJourneys').should(({ request }) => {
      console.log('REQUEST', request);
      expect(request.query).to.have.property('departureStationName');
      expect(request.query.departureStationName).to.include('test departure station');
    });
  });

  it('disables form submit if there are incorrect values', () => {
    const departureStationInput = cy.get('input[name="departureStationName"]');
    departureStationInput.type('123');
    departureStationInput.should('have.value', '123');
    cy.get('button[type="submit"]').should('be.disabled');
    departureStationInput.clear();

    const returnStationInput = cy.get('input[name="returnStationName"]');
    returnStationInput.type('123');
    returnStationInput.should('have.value', '123');
    cy.get('button[type="submit"]').should('be.disabled');
    returnStationInput.clear();

    const minDistanceInput = cy.get('input[name="minDistance"]');
    minDistanceInput.type('incorrect value');
    minDistanceInput.should('have.value', 'incorrect value');
    cy.get('button[type="submit"]').should('be.disabled');
    minDistanceInput.clear();

    const maxDistanceInput = cy.get('input[name="maxDistance"]');
    maxDistanceInput.type('incorrect value');
    maxDistanceInput.should('have.value', 'incorrect value');
    cy.get('button[type="submit"]').should('be.disabled');
    maxDistanceInput.clear();

    const minDurationInput = cy.get('input[name="minDuration"]');
    minDurationInput.type('incorrect value');
    minDurationInput.should('have.value', 'incorrect value');
    cy.get('button[type="submit"]').should('be.disabled');
    minDurationInput.clear();

    const maxDurationInput = cy.get('input[name="maxDuration"]');
    maxDurationInput.type('incorrect value');
    maxDurationInput.should('have.value', 'incorrect value');
    cy.get('button[type="submit"]').should('be.disabled');
    maxDurationInput.clear();
  });

  it('marks incorrect fields with styling', () => {
    const departureStationInput = cy.get('input[name="departureStationName"]');
    departureStationInput.type('123');

    const returnStationInput = cy.get('input[name="returnStationName"]');
    returnStationInput.type('123');

    const minDistanceInput = cy.get('input[name="minDistance"]');
    minDistanceInput.type('incorrect value');

    const maxDistanceInput = cy.get('input[name="maxDistance"]');
    maxDistanceInput.type('incorrect value');

    const minDurationInput = cy.get('input[name="minDuration"]');
    minDurationInput.type('incorrect value');

    const maxDurationInput = cy.get('input[name="maxDuration"]');
    maxDurationInput.type('incorrect value');

    cy.get('input[name="departureStationName"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('input[name="returnStationName"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('input[name="minDistance"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('input[name="maxDistance"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('input[name="minDuration"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('input[name="maxDuration"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('input[name="maxDuration"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
  });

  it('sets ascending sorting order by default', () => {
    const sortByDistance = cy.get('[data-cy="sorting-distance"]');
    sortByDistance.click();
    sortByDistance.should('have.css', 'border-color', ACTIVE_COLOR_RGB);

    const orderAscending = cy.get('[data-cy="sorting-asc"]');
    orderAscending.should('have.css', 'border-color', ACTIVE_COLOR_RGB);
  });

  it('sets sorting by distance by default', () => {
    const orderAscending = cy.get('[data-cy="sorting-asc"]');
    orderAscending.click();
    orderAscending.should('have.css', 'border-color', ACTIVE_COLOR_RGB);

    const sortByDistance = cy.get('[data-cy="sorting-distance"]');
    sortByDistance.should('have.css', 'border-color', ACTIVE_COLOR_RGB);
  });

  it('shows reset button only if the form has been changed', () => {
    cy.get('button[type="reset"]').should('not.exist');
    const departureStationInput = cy.get('input[name="departureStationName"]');
    departureStationInput.type('Test station');

    cy.get('button[type="reset"]').should('exist');
    cy.get('button[type="reset"]').should('be.visible');
  });

  it('resets form by clicking reset', () => {
    const departureStationInput = cy.get('input[name="departureStationName"]');
    departureStationInput.type('Test station');
    departureStationInput.should('have.value', 'Test station');

    cy.get('button[type="reset"]').click();
    cy.get('input[name="departureStationName"]').should('not.have.value');
  });
});
