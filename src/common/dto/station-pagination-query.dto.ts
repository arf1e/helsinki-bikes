import { IsOptional, IsPositive } from 'class-validator';

export class StationPaginationQueryDto {
  @IsOptional()
  @IsPositive()
  page: number;

  @IsOptional()
  name: string;
}
