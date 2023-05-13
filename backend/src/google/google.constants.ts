export const GOOGLE_PLACES_AUTOCOMPLETE_URL =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json';
export const GOOGLE_DETAILS_URL =
  'https://maps.googleapis.com/maps/api/place/details/json';
export const RESTRICTION_HELSINKI_CENTER = {
  lat: 60.22753064732794,
  lng: 24.862055371207724,
};
export const RESTRICTION_RADIUS_IN_METERS = 50000;

export const GOOGLE_PLACES_AUTOCOMPLETE_PARAMS = {
  key: process.env.GOOGLE_MAPS_KEY,
  components: 'country:fi',
  language: 'en',
  region: '.helsinki',
  types: 'address',
  locationrestriction: `circle:${RESTRICTION_RADIUS_IN_METERS}@${RESTRICTION_HELSINKI_CENTER.lat},${RESTRICTION_HELSINKI_CENTER.lng}`,
};

export const GOOGLE_DETAILS_PARAMS = {
  fields: 'geometry',
  key: process.env.GOOGLE_MAPS_KEY,
};
