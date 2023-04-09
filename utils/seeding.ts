import * as yup from 'yup';

export const getJourneyValidationSchema = (stationIds: number[]) => {
  return yup.object({
    departureId: yup.number().oneOf(stationIds).required(),
    returnId: yup.number().oneOf(stationIds).required(),
    departureTime: yup.date(),
    returnTime: yup.date(),
    distance: yup.number().min(10).default(0),
    duration: yup.number().min(10).default(0),
  });
};

export const stationSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  city: yup.string(),
  operator: yup.string(),
  capacity: yup.number().required(),
  x: yup.string().required(),
  y: yup.string().required(),
  address: yup.string(),
});

export const STATIONS_CSV_HEADERS = [
  'FID',
  'id',
  'name',
  'name_sw',
  'name_en',
  'address',
  'address_en',
  'city',
  'city_sw',
  'operator',
  'capacity',
  'x',
  'y',
];

export const JOURNEYS_CSV_HEADERS = [
  'departureTime',
  'returnTime',
  'departureId',
  'departureName',
  'returnId',
  'returnName',
  'distance',
  'duration',
];
