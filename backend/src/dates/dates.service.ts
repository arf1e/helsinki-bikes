import { Injectable } from '@nestjs/common';

@Injectable()
export class DatesService {
  calculateDifferenceBetweenDatesInSeconds(start: string, end: string) {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();

    const differenceInSeconds = Math.floor((endDate - startDate) / 1000);
    return differenceInSeconds;
  }
}
