import { IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateStationDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  x: string;

  @IsString()
  y: string;

  @IsOptional()
  city: string;

  @IsOptional()
  operator: string;

  @IsPositive()
  capacity: number;
}
