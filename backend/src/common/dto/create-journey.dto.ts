import { IsDateString, IsNumber } from 'class-validator';

export class CreateJourneyDto {
  @IsNumber()
  departureId: number;

  @IsNumber()
  returnId: number;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  returnTime: string;

  @IsNumber()
  distance: number;
}
