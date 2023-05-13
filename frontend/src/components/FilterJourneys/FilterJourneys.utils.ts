import { FINNISH_SYMBOLS_REGEXP, POSITIVE_NUMBER_REGEXP } from '@/app/common/validation';
import * as yup from 'yup';

export const STATION_DEPARTURE = 'departure';
export const STATION_RETURN = 'return';

export const SORT_BY_DISTANCE = 'distance';
export const SORT_BY_DURATION = 'duration';

export const ORDER_ASCENDING = 'asc';
export const ORDER_DESCENDING = 'desc';

export const journeysFilterSchema = yup.object({
  departureStationName: yup.string().matches(FINNISH_SYMBOLS_REGEXP),
  returnStationName: yup.string().matches(FINNISH_SYMBOLS_REGEXP),
  minDistance: yup.string().matches(POSITIVE_NUMBER_REGEXP),
  maxDistance: yup.string().matches(POSITIVE_NUMBER_REGEXP),
  minDuration: yup.string().matches(POSITIVE_NUMBER_REGEXP),
  maxDuration: yup.string().matches(POSITIVE_NUMBER_REGEXP),
  sortBy: yup.string().oneOf([SORT_BY_DISTANCE, SORT_BY_DURATION]),
  sortOrder: yup.string().oneOf([ORDER_ASCENDING, ORDER_DESCENDING]),
});

export type TFormValues = {
  departureStationName?: string;
  returnStationName?: string;
  minDistance?: string;
  maxDistance?: string;
  minDuration?: string;
  maxDuration?: string;
  sortBy?: typeof SORT_BY_DISTANCE | typeof SORT_BY_DURATION;
  sortOrder?: typeof ORDER_ASCENDING | typeof ORDER_DESCENDING;
};

export const initialJourneysFormValues: TFormValues = {
  departureStationName: '',
  returnStationName: '',
  minDistance: '',
  maxDistance: '',
  minDuration: '',
  maxDuration: '',
};
