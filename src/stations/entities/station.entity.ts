import { Station } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class StationEntity implements Station {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  city: string;

  @ApiProperty({ required: false, nullable: true })
  operator: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  x: string;

  @ApiProperty()
  y: string;

  @ApiProperty()
  capacity: number;
}
