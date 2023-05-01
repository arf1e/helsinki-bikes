import { IsString } from 'class-validator';

export class LookupCoordinatesDto {
  @IsString()
  placeId: string;
}
