import { POSITIVE_NUMBER_REGEXP } from '@/app/common/validation';
import { FormikProps } from 'formik';
import * as yup from 'yup';
import {
  FIELD_DEPARTURE_STATION_ID,
  FIELD_RETURN_STATION_ID,
  TAddJourneyForm,
  TAddStationForm,
} from './AddEntity.types';

export const stationValidationSchema = yup.object({
  name: yup.string().required('Station name is a required field.'),
  city: yup.string(),
  operator: yup.string(),
  x: yup.string().required(),
  y: yup.string().required(),
  address: yup.string().required(),
  capacity: yup
    .string()
    .min(1)
    .required('Capacity is a required field.')
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
  [FIELD_DEPARTURE_STATION_ID]: yup.number().typeError('Please select departure station').required(),
  [FIELD_RETURN_STATION_ID]: yup.number().required(),
  departureDate: yup.date().required(),
  returnDate: yup
    .date()
    .required()
    .min(yup.ref('departureDate'), 'Return date should be at least after the start date.'),
  distance: yup
    .number()
    .typeError('Please use numbers')
    .required('Please fill distance')
    .min(10, 'Distance should be at least 10 meters'),
  departureStationInput: yup.string().required('Please select departure station'),
  returnStationInput: yup.string().required(),
});

export const addJourneyInitialValues: TAddJourneyForm = {
  [FIELD_DEPARTURE_STATION_ID]: null,
  [FIELD_RETURN_STATION_ID]: null,
  departureDate: '',
  returnDate: '',
  distance: '',
  departureStationInput: '',
  returnStationInput: '',
};

export const isJourneyDurationLongEnough = (formikProps: FormikProps<TAddJourneyForm>) => {
  const { departureDate, returnDate } = formikProps.values;
  const from = new Date(departureDate).getTime();
  const to = new Date(returnDate).getTime();
  const durationInSeconds = Math.floor((to - from) / 1000);
  return durationInSeconds >= 10;
};
