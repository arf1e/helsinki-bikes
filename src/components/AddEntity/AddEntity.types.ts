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

export type STATION_FIELDS = typeof FIELD_DEPARTURE_STATION_ID | typeof FIELD_RETURN_STATION_ID;

export type TAddJourneyForm = {
  [FIELD_DEPARTURE_STATION_ID]: number | null;
  [FIELD_RETURN_STATION_ID]: number | null;
  departureDate: string;
  returnDate: string;
  distance: string;
  departureStationInput: string;
  returnStationInput: string;
};

export const FORM_STATE_IDLE = 'FORM_IDLE';
export const FORM_STATE_LOADING = 'FORM_LOADING';
export const FORM_STATE_SUCCESS = 'FORM_SUCCESS';
export const FORM_STATE_ERROR = 'FORM_ERROR';

export type FORM_STATE =
  | typeof FORM_STATE_IDLE
  | typeof FORM_STATE_LOADING
  | typeof FORM_STATE_SUCCESS
  | typeof FORM_STATE_ERROR;
