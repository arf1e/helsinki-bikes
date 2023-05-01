import { Injectable } from '@nestjs/common';
import { LookupAutocompleteDto } from 'src/common/dto/lookup-autocomplete.dto';
import { LookupCoordinatesDto } from 'src/common/dto/lookup-coordinates.dto';
import { LookupStationsDto } from 'src/common/dto/lookup-stations.dto';
import { GoogleService } from 'src/google/google.service';
import { StationsService } from 'src/stations/stations.service';

@Injectable()
export class LookupService {
  constructor(
    private google: GoogleService,
    private stations: StationsService,
  ) {}

  async autocomplete(query: LookupAutocompleteDto) {
    return this.google.autocomplete(query.input || '');
  }

  async getCoordinates(query: LookupCoordinatesDto) {
    return this.google.getCoordinates(query.placeId);
  }

  async searchStations(query: LookupStationsDto) {
    return this.stations.searchStations(query);
  }
}
