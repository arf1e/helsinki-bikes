import { PrismaClient } from '@prisma/client';
import * as yup from 'yup';

/**
 * When using station IDs from a provided CSV file, the autoincrement counter in a PostgreSQL database is not updated.
 * This can cause errors related to unique constraints when attempting to create new records.
 * To avoid this issue, a query is used to update the ID counter.
 * I got this from this github issue: https://github.com/prisma/prisma/discussions/5256#discussioncomment-1191352
 * @param client - Instance of PrismaClient.
 */
export const resetStationsIdCounter = async (client: PrismaClient) => {
  return client.$executeRaw`SELECT setval(pg_get_serial_sequence('"Station"', 'id'), coalesce(max(id)+1, 1), false) FROM "Station";`;
};

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
