import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationPaginationQueryDto } from 'src/common/dto/station-pagination-query.dto';
import { CreateStationDto } from 'src/common/dto/create-station.dto';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.stationsService.findOne(id);
  }

  @Get()
  findAll(@Query() stationPaginationQuery: StationPaginationQueryDto) {
    return this.stationsService.findMany(stationPaginationQuery);
  }

  @Post('/add')
  createOne(@Body() createStationData: CreateStationDto) {
    return this.stationsService.createOne(createStationData);
  }
}
