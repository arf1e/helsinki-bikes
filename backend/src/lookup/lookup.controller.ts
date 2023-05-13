import { Controller, Get, Query } from '@nestjs/common';
import { LookupService } from './lookup.service';
import { LookupAutocompleteDto } from 'src/common/dto/lookup-autocomplete.dto';
import { LookupCoordinatesDto } from 'src/common/dto/lookup-coordinates.dto';
import { LookupStationsDto } from 'src/common/dto/lookup-stations.dto';

@Controller('lookup')
export class LookupController {
  constructor(private readonly lookupService: LookupService) {}

  @Get('/autocomplete')
  autocomplete(@Query() autocompleteQuery: LookupAutocompleteDto) {
    return this.lookupService.autocomplete(autocompleteQuery);
  }

  @Get('/coordinates')
  getCoordinates(@Query() coordinatesQuery: LookupCoordinatesDto) {
    return this.lookupService.getCoordinates(coordinatesQuery);
  }

  @Get('/stations')
  searchStations(@Query() stationNameQuery: LookupStationsDto) {
    return this.lookupService.searchStations(stationNameQuery);
  }
}
