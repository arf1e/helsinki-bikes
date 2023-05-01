import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { JourneyPaginationQueryDto } from 'src/common/dto/journey-pagination-query.dto';
import { JourneysService } from './journeys.service';
import { CreateJourneyDto } from 'src/common/dto/create-journey.dto';

@Controller('journeys')
export class JourneysController {
  constructor(private readonly journeysService: JourneysService) {}

  @Get()
  findAll(@Query() journeyPaginationQuery: JourneyPaginationQueryDto) {
    return this.journeysService.findMany(journeyPaginationQuery);
  }

  @Post('/add')
  createOne(@Body() createJourneyData: CreateJourneyDto) {
    return this.journeysService.createOne(createJourneyData);
  }
}
