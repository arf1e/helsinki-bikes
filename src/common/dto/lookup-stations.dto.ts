import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LookupStationsDto {
  @IsString()
  @ApiProperty({
    description: 'Station name to search for.',
  })
  name: string;
}
