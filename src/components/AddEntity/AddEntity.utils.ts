import { POSITIVE_NUMBER_REGEXP } from '@/app/common/validation';
import * as yup from 'yup';

export const stationValidationSchema = yup.object({
  name: yup.string().required(),
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

export type TAddStationForm = {
  name: string;
  city: string;
  operator: string;
  x: string;
  y: string;
  address: string;
  capacity: string;
};
