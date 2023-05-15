import { Injectable } from '@nestjs/common';

@Injectable()
export class DatesService {
  calculateDifferenceBetweenDatesInSeconds(start: string, end: string) {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();

    if (Number.isNaN(startDate) || Number.isNaN(endDate)) {
      throw new Error('Incorrect date values');
    }

    const differenceInSeconds = Math.floor((endDate - startDate) / 1000);
    return differenceInSeconds;
  }
}
