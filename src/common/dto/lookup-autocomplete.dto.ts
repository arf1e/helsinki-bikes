import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LookupAutocompleteDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Address string to search for.',
    default: 'Aleksanterinkatu 3',
    required: false,
  })
  input: string;
}
