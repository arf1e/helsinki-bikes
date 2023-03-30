import * as yup from 'yup';

export const journeySchema = yup.object({
  departureId: yup.number(),
  returnId: yup.number(),
  departureTime: yup.date(),
  returnTime: yup.date(),
  distance: yup.number().min(10),
  duration: yup.number().min(10),
});
