import * as yup from 'yup';
import { FINNISH_SYMBOLS_REGEXP } from '@/app/common/validation';

export type TSearchStations = {
  name?: string;
};

export const searchStationsSchema = yup.object({
  name: yup.string().matches(FINNISH_SYMBOLS_REGEXP),
});

export const initialSearchStationsValues: TSearchStations = {
  name: '',
};
