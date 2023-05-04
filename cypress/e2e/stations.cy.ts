import { ERROR_COLOR_RGB } from '../test-constants';

describe('Stations Search Form', () => {
  beforeEach(() => {
    cy.visit('/stations');
    cy.intercept('GET', '/stations?*', { fixture: 'stations-mock.json' }).as('rootStationsApiMock');
  });

  it('encapsulates station name into the api query', () => {
    const stationNameInput = cy.get('input[name="name"]');
    stationNameInput.type('test');
    cy.intercept('GET', '/stations?*', { fixture: 'stations-mock.json' }).as('searchStationsFormApiMock');
    cy.get('button[type="submit"]').click();
    cy.wait('@searchStationsFormApiMock').should(({ request }) => {
      expect(request.query).to.have.property('name');
      expect(request.query.name).to.be.equal('test');
    });
  });

  it('disables form submission if the station name is incorrect', () => {
    const stationNameInput = cy.get('input[name="name"]');
    stationNameInput.type('123');
    cy.get('input[name="name"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('marks the field with styling if it has incorrect value', () => {
    const stationNameInput = cy.get('input[name="name"]');
    stationNameInput.type('123');
    stationNameInput.should('have.css', 'border-color', ERROR_COLOR_RGB);
  });
});

describe('Stations Pagination', () => {
  beforeEach(() => {
    cy.visit('/stations');
    cy.intercept('GET', '/stations?*', { fixture: 'stations-mock.json' }).as('rootStationsApiMock');
  });

  it('passes the page to API query', () => {
    cy.wait('@rootStationsApiMock').should(({ request }) => {
      expect(request.query).to.have.property('page');
      expect(request.query.page).to.be.equal('1');
    });

    cy.get('[data-cy="pagination-next"').click();
    cy.wait('@rootStationsApiMock').should(({ request }) => {
      expect(request.query).to.have.property('page');
      expect(request.query.page).to.be.equal('2');
    });

    cy.get('[data-cy="pagination-last"').click();
    cy.wait('@rootStationsApiMock').should(({ request }) => {
      expect(request.query).to.have.property('page');
      expect(request.query.page).to.be.equal('10');
    });

    cy.get('[data-cy="pagination-previous"]').click();
    cy.wait('@rootStationsApiMock').should(({ request }) => {
      expect(request.query).to.have.property('page');
      expect(request.query.page).to.be.equal('9');
    });
  });
});

describe('Stations Notifications', () => {
  beforeEach(() => {
    cy.visit('/stations');
  });

  it('indicates stations loading state', () => {
    cy.intercept('GET', '/stations?*', { fixture: 'stations-mock.json', delay: 100 }).as('loadingStateApiMock');
    cy.get('[data-cy="statusbar-LOADING"]').should('be.visible');
    cy.wait('@loadingStateApiMock');
    cy.get('[data-cy="statusbar-IDLE"]').should('exist');
    cy.get('[data-cy="statusbar-LOADING"').should('not.exist');
  });

  it('indicates stations error state and hides it after click', () => {
    cy.intercept('GET', '/stations?*', {
      statusCode: 400,
      body: {
        message: 'Test error',
      },
      delay: 100,
    }).as('errorStateApiMock');
    cy.get('[data-cy="statusbar-LOADING"]').should('be.visible');
    cy.wait('@errorStateApiMock');
    cy.get('[data-cy="statusbar-IDLE"]').should('exist');
    cy.get('[data-cy="statusbar-LOADING"').should('not.exist');
  });
});

describe('Stations List', () => {
  beforeEach(() => {
    cy.visit('/stations');
    cy.intercept('GET', '/stations?*', { fixture: 'stations-mock.json' }).as('rootStationsApiMock');
  });

  it('redirects the user to the corresponding station page by clicking on a station card', () => {
    cy.get('[href="/stations/1"]').click();
    cy.intercept('GET', { fixture: 'single-station-mock.json' }).as('singleStationApiMock');
    cy.url().should('include', '/stations/1');
  });
});
