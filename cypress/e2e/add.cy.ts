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

  it('errors if failed to get autocomplete results', () => {
    cy.intercept('/lookup/autocomplete?*', { statusCode: 400 }).as('failedAutocompleteApiMock');
    cy.get('[data-cy="input-address"]').type('test');
    cy.get('span.error:contains("Failed to get autocomplete results: Request failed with status code 400")').should(
      'be.visible',
    );
  });

  it('shows statusbar error if failed to obtain coordinates', () => {
    cy.intercept('/lookup/autocomplete?*', { fixture: 'lookup-autocomplete-mock.json' }).as(
      'lookupAutocompleteApiMock',
    );
    cy.intercept('/lookup/coordinates?*', { statusCode: 400 }).as('failedCoordinatesApiMock');
    cy.get('[data-cy="input-address"]').type('test');
    cy.get('[data-cy="suggestion--designergatan"]').click();
    cy.get('[data-cy="statusbar-ERROR"]').should('be.visible');
    cy.get(
      'span.message:contains("Could not resolve address coordinates: Request failed with status code 400")',
    ).should('be.visible');
  });

  it('puts marker on the map for the selected station address', () => {
    cy.intercept('/lookup/autocomplete?*', { fixture: 'lookup-autocomplete-mock.json' }).as(
      'lookupAutocompleteApiMock',
    );
    cy.intercept('/lookup/coordinates?*', { fixture: 'lookup-coordinates-mock.json' }).as('lookupCoordinatesApiMock');
    cy.get('[data-cy="input-address"]').type('test');
    cy.get('[data-cy="suggestion--designergatan"]').click();
    cy.wait('@lookupCoordinatesApiMock').then((interception) => {
      cy.log(JSON.stringify(interception.response));
      cy.get(
        `[data-cy="marker-${interception.response?.body.lat}-${interception.response?.body.lng}-untitled"]`,
      ).should('be.visible');
    });
  });

  it('clears marker on form reset', () => {
    cy.intercept('/lookup/autocomplete?*', { fixture: 'lookup-autocomplete-mock.json' }).as(
      'lookupAutocompleteApiMock',
    );
    cy.intercept('/lookup/coordinates?*', { fixture: 'lookup-coordinates-mock.json' }).as('lookupCoordinatesApiMock');
    cy.get('[data-cy="input-address"]').type('test');
    cy.get('[data-cy="suggestion--designergatan"]').click();
    cy.wait('@lookupCoordinatesApiMock').then((interception) => {
      cy.log(JSON.stringify(interception.response));
      cy.get(
        `[data-cy="marker-${interception.response?.body.lat}-${interception.response?.body.lng}-untitled"]`,
      ).should('be.visible');
      cy.get('button[type="reset"]').click();
      cy.get(
        `[data-cy="marker-${interception.response?.body.lat}-${interception.response?.body.lng}-untitled"]`,
      ).should('not.exist');
    });
  });

  it('constructs valid request body on submit and shows success message', () => {
    cy.intercept('/lookup/autocomplete?*', { fixture: 'lookup-autocomplete-mock.json' }).as(
      'lookupAutocompleteApiMock',
    );
    cy.intercept('/lookup/coordinates?*', { fixture: 'lookup-coordinates-mock.json' }).as('lookupCoordinatesApiMock');
    cy.intercept('/stations/add', { statusCode: 201 }).as('createNewStationApiMock');
    cy.get('[data-cy="input-name"]').type('Test station');
    cy.get('[data-cy="input-address"]').type('test');
    cy.get('[data-cy="suggestion--designergatan"]').click();
    cy.get('[data-cy="input-capacity"]').type('12');
    cy.get('[data-cy="input-city"]').type('Espoo');
    cy.get('[data-cy="input-operator"]').type('City Bike Finland');
    cy.get('button[type="submit"]').click();
    cy.wait('@createNewStationApiMock').should(({ request }) => {
      expect(request.body).to.have.property('name');
      expect(request.body.name).to.equal('Test station');
      expect(request.body).to.have.property('capacity');
      expect(request.body.capacity).to.equal('12');
      expect(request.body).to.have.property('address');
      expect(request.body.address).to.equal('Designergatan');
      expect(request.body).to.have.property('x');
      expect(request.body.x).to.include('24');
      expect(request.body).to.have.property('y');
      expect(request.body.y).to.include('60');
      expect(request.body).to.have.property('city');
      expect(request.body.city).to.equal('Espoo');
      expect(request.body).to.have.property('operator');
      expect(request.body.operator).to.equal('City Bike Finland');
    });
    cy.get('[data-cy="statusbar-SUCCESS"]').should('be.visible');
    cy.get('span.message:contains("New station has been successfully created!")').should('be.visible');
  });

  it('shows error notification if form submission errors', () => {
    cy.intercept('/lookup/autocomplete?*', { fixture: 'lookup-autocomplete-mock.json' }).as(
      'lookupAutocompleteApiMock',
    );
    cy.intercept('/lookup/coordinates?*', { fixture: 'lookup-coordinates-mock.json' }).as('lookupCoordinatesApiMock');
    cy.intercept('/stations/add', { statusCode: 400, delay: 100 }).as('failedCreateNewStationApiMock');
    cy.get('[data-cy="input-name"]').type('Test station');
    cy.get('[data-cy="input-address"]').type('test');
    cy.get('[data-cy="suggestion--designergatan"]').click();
    cy.get('[data-cy="input-capacity"]').type('12');
    cy.get('[data-cy="input-city"]').type('Espoo');
    cy.get('[data-cy="input-operator"]').type('City Bike Finland');
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="statusbar-LOADING"]').should('be.visible');
    cy.wait('@failedCreateNewStationApiMock');
    cy.get('[data-cy="statusbar-ERROR"]').should('be.visible');
    cy.get('span.message:contains("Failed to reach the server to create new station.")').should('be.visible');
  });
});

describe('New Journey Form', () => {
  beforeEach(() => {
    cy.visit('/add');
    cy.get('[data-cy="option-add-journey"]').click();
  });

  it('shows errors on fields when trying to submit clean form', () => {
    cy.get('button[type="submit"]').click();

    cy.get('[data-cy="input-distance"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.error:contains("Please enter journey distance.")').should('be.visible');

    cy.get('[data-cy="input-departure-station"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.error:contains("Please enter departure station name.")').should('be.visible');

    cy.get('[data-cy="input-departure-date"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.form-error:contains("Please enter departure date.")').should('be.visible');

    cy.get('[data-cy="input-return-station"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.error:contains("Please enter return station name.")').should('be.visible');

    cy.get('[data-cy="input-return-date"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.form-error:contains("Please enter return date.")').should('be.visible');

    cy.get('span.form-error:contains("Please choose return station from autocomplete list.")').should('be.visible');
    cy.get('span.form-error:contains("Please choose departure station from autocomplete list.")').should('be.visible');
  });

  it('errors if user puts letters in distance field', () => {
    cy.get('[data-cy="input-distance"]').type('test');
    cy.get('[data-cy="input-distance"]').blur();
    cy.get('[data-cy="input-distance"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.error:contains("Please use numbers.")').should('be.visible');
  });

  it('errors if user puts negative numbers in distance field', () => {
    cy.get('[data-cy="input-distance"]').type('-0');
    cy.get('[data-cy="input-distance"]').blur();
    cy.get('[data-cy="input-distance"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.error:contains("Distance should be at least 10 meters long.")').should('be.visible');

    cy.get('[data-cy="input-distance"]').clear();
    cy.get('[data-cy="input-distance"]').type('-10').blur();
    cy.get('[data-cy="input-distance"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.error:contains("Distance should be at least 10 meters long.")').should('be.visible');
  });

  it('errors if the distance is less than 10 meters', () => {
    cy.get('[data-cy="input-distance"]').type('5');
    cy.get('[data-cy="input-distance"]').blur();
    cy.get('[data-cy="input-distance"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.error:contains("Distance should be at least 10 meters long.")').should('be.visible');

    cy.get('[data-cy="input-distance"]').clear().type('9');
    cy.get('[data-cy="input-distance"]').blur();
    cy.get('[data-cy="input-distance"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.error:contains("Distance should be at least 10 meters long.")').should('be.visible');
  });

  it('errors if the duration is less than 10 seconds', () => {
    cy.get('[data-cy="input-departure-date"]').type('2023-05-08T15:00:00');
    cy.get('[data-cy="input-return-date"]').type('2023-05-08T15:00:05');
    cy.get('[data-cy="input-return-date"]').blur();
    cy.get('[data-cy="input-return-date"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get('span.form-error:contains("Journey duration should be at least 10 seconds long.")').should('be.visible');
  });

  it('errors if user has entered the station name but did not select an option from autocomplete', () => {
    cy.intercept('/lookup/stations?*', { fixture: 'lookup-stations-mock' }).as('lookupStationMock');

    cy.get('[data-cy="input-departure-station"]').type('test station').blur();
    cy.get('[data-cy="input-return-station"]').type('test station').blur();

    cy.get('button[type="submit"]').click();

    cy.get('span.form-error:contains("Please choose return station from autocomplete list.")').should('be.visible');
    cy.get('span.form-error:contains("Please choose departure station from autocomplete list.")').should('be.visible');
  });

  it('errors if failed to get station suggestions', () => {
    cy.intercept('/lookup/stations?*', { statusCode: 400 }).as('failedLookupStationMock');

    cy.get('[data-cy="input-departure-station"]').type('test station').blur();
    cy.get('[data-cy="input-departure-station"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get(
      '[data-cy="input-departure-station"]+span.error:contains("Unable to find station: Request failed with status code 400")',
    );

    cy.get('[data-cy="input-return-station"]').type('test station').blur();
    cy.get('[data-cy="input-return-station"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get(
      '[data-cy="input-return-station"]+span.error:contains("Unable to find station: Request failed with status code 400")',
    );
  });

  it('puts markers on map when user selects station from autocomplete list', () => {
    cy.intercept('/lookup/stations?*', { fixture: 'lookup-stations-mock' }).as('lookupStationMock');

    cy.get('[data-cy="input-departure-station"]').type('test');
    cy.get('[data-cy="suggestion-1"]').click();
    cy.get('[data-cy="marker-60.155369615074-24.9502114714031-1"]').should('be.visible');

    cy.get('[data-cy="input-return-station"]').type('test');
    cy.get('[data-cy="suggestion-10"]').click();
    cy.get('[data-cy="marker-60.165017172741-24.9494728793816-2"]').should('be.visible');
  });

  it('sets min value on return date input as current departure date', () => {
    cy.get('[data-cy="input-departure-date"]').type('2023-05-08T15:00:05');
    cy.get('[data-cy="input-return-date"]').should('have.attr', 'min', '2023-05-08T15:00:05');
  });

  it('errors if return date is before departure date', () => {
    cy.get('[data-cy="input-departure-date"]').type('2023-05-08T15:00:05');
    cy.get('[data-cy="input-return-date"]').type('2023-05-07T15:00:05');

    cy.get('[data-cy="input-return-date"]').should('have.css', 'border-color', ERROR_COLOR_RGB);
    cy.get(
      '[data-cy="input-return-date"]+span.form-error:contains("Return date should be at least after the start date.")',
    ).should('be.visible');
  });

  it('marks departure station on the map as 1 and return point as 2 regardless of the order the user has put it in the form', () => {
    cy.intercept('/lookup/stations?*', { fixture: 'lookup-stations-mock' }).as('lookupStationMock');

    cy.get('[data-cy="input-return-station"]').type('test');
    cy.get('[data-cy="suggestion-10"]').click();
    cy.get('[data-cy="marker-60.165017172741-24.9494728793816-2"]').should('be.visible');

    cy.get('[data-cy="input-departure-station"]').type('test');
    cy.get('[data-cy="suggestion-1"]').click();
    cy.get('[data-cy="marker-60.155369615074-24.9502114714031-1"]').should('be.visible');
  });

  it('clears markers on form reset', () => {
    cy.intercept('/lookup/stations?*', { fixture: 'lookup-stations-mock' }).as('lookupStationMock');

    cy.get('[data-cy="input-return-station"]').type('test');
    cy.get('[data-cy="suggestion-10"]').click();
    cy.get('[data-cy="marker-60.165017172741-24.9494728793816-2"]').should('be.visible');

    cy.get('[data-cy="input-departure-station"]').type('test');
    cy.get('[data-cy="suggestion-1"]').click();
    cy.get('[data-cy="marker-60.155369615074-24.9502114714031-1"]').should('be.visible');

    cy.get('button[type="reset"]').click();
    cy.get('[data-cy="marker-60.165017172741-24.9494728793816-2"]').should('not.exist');
    cy.get('[data-cy="marker-60.155369615074-24.9502114714031-1"]').should('not.exist');
  });

  it('constructs valid request body and shows success message on form submit', () => {
    cy.intercept('/lookup/stations?*', { fixture: 'lookup-stations-mock' }).as('lookupStationMock');
    cy.intercept('/journeys/add', { statusCode: 201 }).as('createNewJourneyApiMock');

    cy.get('[data-cy="input-distance"]').type('500');

    cy.get('[data-cy="input-departure-station"]').type('test');
    cy.get('[data-cy="suggestion-1"]').click();

    cy.get('[data-cy="input-return-station"]').type('test');
    cy.get('[data-cy="suggestion-10"]').click();

    cy.get('[data-cy="input-departure-date"]').type('2023-05-08T15:00:05');
    cy.get('[data-cy="input-return-date"]').type('2023-05-08T16:00:15');

    cy.get('button[type="submit"]').click();

    cy.wait('@createNewJourneyApiMock').should(({ request }) => {
      expect(request.body).to.have.property('distance');
      expect(request.body.distance).to.be.equal('500');
      expect(request.body).to.have.property('departureId');
      expect(request.body.departureId).to.be.equal(1);
      expect(request.body).to.have.property('returnId');
      expect(request.body.returnId).to.be.equal(10);
      expect(request.body).to.have.property('departureTime');
      expect(request.body.departureTime).to.be.equal('2023-05-08T15:00:05');
      expect(request.body).to.have.property('returnTime');
      expect(request.body.returnTime).to.be.equal('2023-05-08T16:00:15');
    });
    cy.get('[data-cy="statusbar-SUCCESS"]').should('be.visible');
    cy.get('span.message:contains("New journey has been successfully created!")').should('be.visible');
  });

  it('shows statusbar error if form submission fails', () => {
    cy.intercept('/lookup/stations?*', { fixture: 'lookup-stations-mock' }).as('lookupStationMock');
    cy.intercept('/journeys/add', { statusCode: 400 }).as('failedCreateNewJourneyApiMock');

    cy.get('[data-cy="input-distance"]').type('500');

    cy.get('[data-cy="input-departure-station"]').type('test');
    cy.get('[data-cy="suggestion-1"]').click();

    cy.get('[data-cy="input-return-station"]').type('test');
    cy.get('[data-cy="suggestion-10"]').click();

    cy.get('[data-cy="input-departure-date"]').type('2023-05-08T15:00:05');
    cy.get('[data-cy="input-return-date"]').type('2023-05-08T16:00:15');

    cy.get('button[type="submit"]').click();

    cy.wait('@failedCreateNewJourneyApiMock');
    cy.get('[data-cy="statusbar-ERROR"]').should('be.visible');
    cy.get('span.message:contains("Failed to reach the server to create new journey.")').should('be.visible');
  });
});
