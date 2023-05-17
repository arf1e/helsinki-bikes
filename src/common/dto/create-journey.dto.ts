import { IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateJourneyDto {
  @ApiProperty({ description: 'Departure station id.', default: 1 })
  @IsNumber()
  departureId: number;

  @IsNumber()
  @ApiProperty({ description: 'Return station id.', default: 2 })
  returnId: number;

  @IsDateString()
  @ApiProperty({
    description:
      'Departure time in ISO8601 format (YYYY-MM-DDTHH-MM-SS, i.e. 2023-05-16T12:34:56).',
    default: '2023-05-10T15:00:05',
  })
  departureTime: string;

  @IsDateString()
  @ApiProperty({
    description: 'Return time in ISO8601 format (YYYY-MM-DDTHH-MM-SS).',
    default: '2023-05-10T16:00:15',
  })
  returnTime: string;

  @IsNumber()
  @ApiProperty({
    description: 'Journey distance in meters.',
    default: 350,
  })
  distance: number;
}
