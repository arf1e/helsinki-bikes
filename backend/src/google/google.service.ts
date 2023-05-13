import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { URLSearchParams } from 'url';
import {
  GOOGLE_DETAILS_PARAMS,
  GOOGLE_DETAILS_URL,
  GOOGLE_PLACES_AUTOCOMPLETE_PARAMS,
  GOOGLE_PLACES_AUTOCOMPLETE_URL,
} from './google.constants';

@Injectable()
export class GoogleService {
  /**
   * This private method is used to create URL-encoded query params
   * @param input - Object of all the query params to include
   * @returns URLSearchParams object
   */
  private generateSearchParams(input: { [key: string]: string }) {
    return new URLSearchParams(input);
  }

  /**
   * This private method calls Google Autocomplete API for suggestions based on the current input
   * @param input Name of the place to search by
   * @returns Promise resolving to a Google Autocomplete response object containing predictions array.
   */
  private async fetchGoogleAutocomplete(input: string) {
    const params = this.generateSearchParams({
      ...GOOGLE_PLACES_AUTOCOMPLETE_PARAMS,
      input,
    });

    return fetch(`${GOOGLE_PLACES_AUTOCOMPLETE_URL}?${params.toString()}`).then(
      (res) => res.json(),
    );
  }

  /**
   * This private method calls Google Places API for coordinates of provided place by its place_id
   * @param place_id Google's place_id, normally acquired from Maps Api
   * @returns Promise resolving to a Google Places response object containing coordinates
   */
  private async fetchGooglePlaces(place_id: string) {
    const params = new URLSearchParams({
      ...GOOGLE_DETAILS_PARAMS,
      place_id,
    });

    return fetch(`${GOOGLE_DETAILS_URL}?${params.toString()}`).then((res) =>
      res.json(),
    );
  }

  /**
   * This private method queries Google Autocomplete API for predictions if there is something in the input.
   * @param input Name of the place to search by, possibly does not exist
   * @returns array of predictions containing place_id, main_text and secondary_text of places
   * @throws InternalServerError if could not fetch Google Api.
   */
  private async getAutocompletePredictionsFromGoogleApi(input = '') {
    if (!input) {
      return {
        predictions: [],
      };
    }
    try {
      const googleResponse = await this.fetchGoogleAutocomplete(input);
      const formattedPredictions = googleResponse.predictions.map((elt) => ({
        place_id: elt.place_id,
        main_text: elt.structured_formatting.main_text,
        secondary_text: elt.structured_formatting.secondary_text,
      }));
      return { predictions: formattedPredictions };
    } catch {
      throw new InternalServerErrorException(
        'Failed to get autocomplete results',
      );
    }
  }

  private async getGeometryDetailsFromGoogleApi(place_id: string) {
    try {
      const googleResponse = await this.fetchGooglePlaces(place_id);
      const coordinates = googleResponse.result.geometry.location;
      return coordinates;
    } catch {
      throw new InternalServerErrorException('Failed to obtain coordinates.');
    }
  }

  /**
   * Interface method to get autocomplete predictions from Google.
   * @param input Name of the place to search by
   * @returns
   */
  async autocomplete(input = '') {
    return this.getAutocompletePredictionsFromGoogleApi(input);
  }

  /**
   * Interface method to get coordinates of the given place from Google.
   * @param placeId Google's place_id, normally acquired from Maps Api
   * @returns
   */
  async getCoordinates(placeId: string) {
    return this.getGeometryDetailsFromGoogleApi(placeId);
  }
}
