import { FIELD_DEPARTURE_STATION_ID, FIELD_RETURN_STATION_ID, STATION_FIELDS } from './AddEntity.types';

export const UPDATE_DEPARTURE = 'UPDATE_DEPARTURE';
export const UPDATE_RETURN = 'UPDATE_RETURN';
export const RESET_COORDINATES = 'RESET_COORDINATES';

export type JOURNEY_MAP_ACTION_TYPE = typeof UPDATE_DEPARTURE | typeof UPDATE_RETURN | typeof RESET_COORDINATES;

export type StationsPointsState = {
  departure: {
    x: string;
    y: string;
    hidden: boolean;
  };
  return: {
    x: string;
    y: string;
    hidden: boolean;
  };
};

export const stationsPointsInitialState: StationsPointsState = {
  departure: {
    x: '0',
    y: '0',
    hidden: true,
  },
  return: {
    x: '0',
    y: '0',
    hidden: true,
  },
};

export const initStationCoords = () => stationsPointsInitialState;

export const mapStationFieldToType = (field: STATION_FIELDS): JOURNEY_MAP_ACTION_TYPE => {
  const mapper = {
    [FIELD_DEPARTURE_STATION_ID]: UPDATE_DEPARTURE,
    [FIELD_RETURN_STATION_ID]: UPDATE_RETURN,
  };

  return mapper[field] as JOURNEY_MAP_ACTION_TYPE;
};

export default function coordinatesReducer(
  state: StationsPointsState,
  action: { type: JOURNEY_MAP_ACTION_TYPE; payload: { x: string; y: string } },
) {
  switch (action.type) {
    case UPDATE_DEPARTURE:
      return { ...state, departure: { ...action.payload, hidden: false } };
    case UPDATE_RETURN:
      return { ...state, return: { ...action.payload, hidden: false } };
    case RESET_COORDINATES:
      return stationsPointsInitialState;
    default:
      return state;
  }
}
