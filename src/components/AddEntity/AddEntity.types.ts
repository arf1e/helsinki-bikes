export type TAddStationForm = {
  name: string;
  city: string;
  operator: string;
  x: string;
  y: string;
  address: string;
  capacity: string;
};

export const FIELD_DEPARTURE_STATION_ID = 'departureId';
export const FIELD_RETURN_STATION_ID = 'returnId';
export const DEPARTURE_STATION_INPUT = 'departureStationInput';
export const RETURN_STATION_INPUT = 'returnStationInput';

export type STATION_FIELDS = typeof FIELD_DEPARTURE_STATION_ID | typeof FIELD_RETURN_STATION_ID;
export type STATIONS_INPUTS = typeof DEPARTURE_STATION_INPUT | typeof RETURN_STATION_INPUT;

export type TAddJourneyForm = {
  [FIELD_DEPARTURE_STATION_ID]: number | null;
  [FIELD_RETURN_STATION_ID]: number | null;
  departureDate: string;
  returnDate: string;
  distance: string;
  [DEPARTURE_STATION_INPUT]: string;
  [RETURN_STATION_INPUT]: string;
};

export const FORM_STATE_IDLE = 'FORM_IDLE';
export const FORM_STATE_LOADING = 'FORM_LOADING';
export const FORM_STATE_SUCCESS = 'FORM_SUCCESS';

export type FORM_STATE = typeof FORM_STATE_IDLE | typeof FORM_STATE_LOADING | typeof FORM_STATE_SUCCESS;
