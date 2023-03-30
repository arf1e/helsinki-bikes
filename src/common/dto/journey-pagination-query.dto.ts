import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString, IsEnum } from 'class-validator';

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
  page: number;

  @IsOptional()
  departureStationName: string;

  @IsOptional()
  returnStationName: string;

  @IsOptional()
  @IsPositive()
  minDistance: number;

  @IsOptional()
  @IsPositive()
  maxDistance: number;

  @IsOptional()
  @IsPositive()
  minDuration: number;

  @IsOptional()
  @IsPositive()
  maxDuration: number;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy: string;

  @IsOptional()
  @IsEnum(Order)
  sortOrder: string;
}
