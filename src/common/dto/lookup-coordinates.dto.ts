import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LookupCoordinatesDto {
  @IsString()
  @ApiProperty({
    description: "Google's place_id to resolve coordinates for.",
  })
  placeId: string;
}
