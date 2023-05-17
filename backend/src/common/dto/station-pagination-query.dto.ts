import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class StationPaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({
    description: 'Current page number. Defaults to 1 if not provided.',
    required: false,
    nullable: true,
  })
  page: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name of the station to search for.',
    required: false,
  })
  name: string;
}
