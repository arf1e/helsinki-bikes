import { IsString } from 'class-validator';

export class LookupStationsDto {
  @IsString()
  name: string;
}
