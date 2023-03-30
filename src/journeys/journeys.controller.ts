import { Controller, Get, Param, Query } from '@nestjs/common';
import { JourneyPaginationQueryDto } from 'src/common/dto/journey-pagination-query.dto';
import { JourneysService } from './journeys.service';

@Controller('journeys')
export class JourneysController {
  constructor(private readonly journeysService: JourneysService) {}

  @Get()
  findAll(@Query() journeyPaginationQuery: JourneyPaginationQueryDto) {
    return this.journeysService.findMany(journeyPaginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.journeysService.findOne(id);
  }
}
