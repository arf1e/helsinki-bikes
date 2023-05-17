import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsEnum } from 'class-validator';

enum SortBy {
  DISTANCE = 'distance',
  DURATION = 'duration',
}

enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export class JourneyPaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({
    required: false,
    description: 'Page number.',
  })
  page: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Name of the departure station to search journeys by.',
  })
  departureStationName: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Name of the return station to search journeys by.',
  })
  returnStationName: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty({
    required: false,
    description: 'Minimal distance to filter journeys by.',
  })
  minDistance: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({
    required: false,
    description: 'Maximum distance to filter journeys by.',
  })
  maxDistance: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({
    required: false,
    description: 'Minimum duration to filter journeys by.',
  })
  minDuration: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({
    required: false,
    description: 'Maximum duration to filter journeys by.',
  })
  maxDuration: number;

  @IsOptional()
  @IsEnum(SortBy)
  @ApiProperty({
    required: false,
    description:
      'Property on which the journeys should be sorted – enum["distance","duration"].',
  })
  sortBy: string;

  @IsOptional()
  @IsEnum(Order)
  @ApiProperty({
    required: false,
    description: 'Sort order – enum["asc", "desc"].',
  })
  sortOrder: string;
}
