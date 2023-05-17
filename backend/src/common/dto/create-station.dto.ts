import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateStationDto {
  @IsString()
  @ApiProperty({
    description: 'Station name.',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Station address',
    default: 'Aleksanterinkatu, 3',
  })
  address: string;

  @IsString()
  @ApiProperty({
    description: 'Station x (lng) coordinate.',
  })
  x: string;

  @IsString()
  @ApiProperty({
    description: 'Station y (lat) coordinate.',
  })
  y: string;

  @IsOptional()
  @ApiProperty({
    description: 'Station city.',
    required: false,
  })
  city: string;

  @IsOptional()
  @ApiProperty({
    description: 'Station operator.',
    required: false,
  })
  operator: string;

  @IsPositive()
  @ApiProperty({
    description: 'Station capacity.',
  })
  capacity: number;
}
