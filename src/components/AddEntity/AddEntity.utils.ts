import { FINNISH_SYMBOLS_REGEXP, POSITIVE_NUMBER_REGEXP } from '@/app/common/validation';
import { FormikProps } from 'formik';
import * as yup from 'yup';
import {
  DEPARTURE_STATION_INPUT,
  FIELD_DEPARTURE_STATION_ID,
  FIELD_RETURN_STATION_ID,
  RETURN_STATION_INPUT,
  TAddJourneyForm,
  TAddStationForm,
} from './AddEntity.types';

export const stationValidationSchema = yup.object({
  name: yup.string().required('Please enter the station name.'),
  city: yup.string().matches(FINNISH_SYMBOLS_REGEXP, 'City name is invalid.'),
  operator: yup.string().matches(FINNISH_SYMBOLS_REGEXP, 'Operator is invalid.'),
  x: yup.string().required('Please choose station address from autocomplete list.'),
  y: yup.string().required(),
  address: yup.string().required('Please enter the station address.'),
  capacity: yup
    .string()
    .min(1)
    .required('Please enter station capacity.')
    .matches(POSITIVE_NUMBER_REGEXP, 'Capacity should be a positive number.'),
});

export const addStationInitialValues: TAddStationForm = {
  name: '',
  city: '',
  operator: '',
  x: '',
  y: '',
  address: '',
  capacity: '',
};

export const journeyValidationSchema = yup.object({
  [FIELD_DEPARTURE_STATION_ID]: yup
    .number()
    .typeError('Please choose return station from autocomplete list.')
    .required('Please choose departure station from autocomplete list.'),
  [FIELD_RETURN_STATION_ID]: yup
    .number()
    .typeError('Please choose return station from autocomplete list.')
    .required('Please choose return station from autocomplete list.'),
  departureDate: yup.date().required('Please enter departure date.'),
  returnDate: yup
    .date()
    .required('Please enter return date.')
    .min(yup.ref('departureDate'), 'Return date should be at least after the start date.'),
  distance: yup
    .number()
    .typeError('Please use numbers')
    .required('Please fill distance')
    .min(10, 'Distance should be at least 10 meters long.'),
  [DEPARTURE_STATION_INPUT]: yup.string().required('Please enter departure station name.'),
  [RETURN_STATION_INPUT]: yup.string().required('Please enter return station name.'),
});

export const addJourneyInitialValues: TAddJourneyForm = {
  [FIELD_DEPARTURE_STATION_ID]: null,
  [FIELD_RETURN_STATION_ID]: null,
  departureDate: '',
  returnDate: '',
  distance: '',
  [DEPARTURE_STATION_INPUT]: '',
  [RETURN_STATION_INPUT]: '',
};

export const isJourneyDurationLongEnough = (formikProps: FormikProps<TAddJourneyForm>) => {
  const { departureDate, returnDate } = formikProps.values;
  const from = new Date(departureDate).getTime();
  const to = new Date(returnDate).getTime();
  const durationInSeconds = Math.floor((to - from) / 1000);
  return durationInSeconds >= 10;
};
