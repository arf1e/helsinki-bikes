import { DEPARTURE_STATION_INPUT, RETURN_STATION_INPUT, STATIONS_INPUTS } from './AddEntity.types';

export const SET_DEPARTURE_AUTOCOMPLETE_ERROR = 'SET_DEPARTURE_AUTOCOMPLETE_ERROR';
export const SET_RETURN_AUTOCOMPLETE_ERROR = 'SET_RETURN_AUTOCOMPLETE_ERROR';
export const CLEAR_AUTOCOMPLETE_ERRORS = 'CLEAR_AUTOCOMPLETE_ERRORS';

export type STATION_AUTOCOMPLETE_ERROR_TYPE =
  | typeof SET_DEPARTURE_AUTOCOMPLETE_ERROR
  | typeof SET_RETURN_AUTOCOMPLETE_ERROR
  | typeof CLEAR_AUTOCOMPLETE_ERRORS;

export type StationsAutocompleteErrorsState = {
  [DEPARTURE_STATION_INPUT]: string;
  [RETURN_STATION_INPUT]: string;
};

export const stationsAutocompleteErrorsInitialState: StationsAutocompleteErrorsState = {
  [DEPARTURE_STATION_INPUT]: '',
  [RETURN_STATION_INPUT]: '',
};

export const initStationsAutocompleteErrorsState = () => stationsAutocompleteErrorsInitialState;

export const mapStationToErrorActionType = (stationKind: STATIONS_INPUTS): STATION_AUTOCOMPLETE_ERROR_TYPE => {
  const mapper = {
    [DEPARTURE_STATION_INPUT]: SET_DEPARTURE_AUTOCOMPLETE_ERROR,
    [RETURN_STATION_INPUT]: SET_RETURN_AUTOCOMPLETE_ERROR,
  };

  return mapper[stationKind] as STATION_AUTOCOMPLETE_ERROR_TYPE;
};

export default function stationsAutocompleteErrorsReducer(
  state: StationsAutocompleteErrorsState,
  action: { type: STATION_AUTOCOMPLETE_ERROR_TYPE; payload: string },
) {
  switch (action.type) {
    case SET_DEPARTURE_AUTOCOMPLETE_ERROR:
      return { ...state, [DEPARTURE_STATION_INPUT]: action.payload };
    case SET_RETURN_AUTOCOMPLETE_ERROR:
      return { ...state, [RETURN_STATION_INPUT]: action.payload };
    case CLEAR_AUTOCOMPLETE_ERRORS:
      return { ...stationsAutocompleteErrorsInitialState };
    default:
      return state;
  }
}
