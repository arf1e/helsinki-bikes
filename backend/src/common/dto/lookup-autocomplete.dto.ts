import { IsOptional, IsString } from 'class-validator';

export class LookupAutocompleteDto {
  @IsOptional()
  @IsString()
  input: string;
}
