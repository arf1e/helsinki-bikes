import { Test, TestingModule } from '@nestjs/testing';
import { DatesService } from './dates.service';

describe('DatesService', () => {
  let service: DatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatesService],
    }).compile();

    service = module.get<DatesService>(DatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate difference between dates in seconds', () => {
    const start = '2022-01-01T00:00:00Z';
    const end = '2022-01-01T00:01:30Z';
    const result = service.calculateDifferenceBetweenDatesInSeconds(start, end);
    expect(result).toEqual(90);
  });

  it('should throw an error if unable to parse dates from given values', () => {
    const start = 'not_date_value';
    const end = 'not_date_value';
    expect(() =>
      service.calculateDifferenceBetweenDatesInSeconds(start, end),
    ).toThrow();
  });
});
