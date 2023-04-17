export type GooglePlace = {
  place_id: string;
  main_text: string;
  secondary_text: string;
};

export type GoogleAutocompleteApiResponse = {
  predictions: GooglePlace[];
};
