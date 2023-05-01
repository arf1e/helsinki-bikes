import client from '@/app/common/api';
import { StationSuggestion, StationsSuggestionsApiResponse } from '@/app/types/stations';
import debounce from 'lodash.debounce';
import { useState } from 'react';
import FormTextField from '../FormField';
import { AxiosError } from 'axios';

const getStationsSuggestions = debounce(
  async (
    name = '',
    dataHandler: (suggestions: StationSuggestion[]) => void,
    handleError: (error: AxiosError) => void,
  ) => {
    return client
      .get<any, { data: StationsSuggestionsApiResponse }>('/lookup/stations', {
        params: { name },
      })
      .then(({ data }: { data: StationSuggestion[] }) => {
        dataHandler(data);
      })
      .catch(handleError);
  },
  200,
);

type Props = {
  value: string;
  fieldTitle: string;
  fieldPlaceholder: string;
  setValue: (value: string) => void;
  onChooseOption: (option: StationSuggestion) => void;
  error?: string;
  onBlur?: (e: any) => void;
};

const StationsAutocompleteField = ({
  onChooseOption,
  value,
  setValue,
  fieldTitle,
  fieldPlaceholder,
  error,
  onBlur,
}: Props) => {
  const [suggestions, setSuggestions] = useState<StationSuggestion[]>([]);
  const [autocompleteError, setAutocompleteError] = useState('');

  const handleAutocompleteError = (error: AxiosError) => {
    setAutocompleteError(`Unable to find station: ${error.message}`);
  };

  const handleInput = async (input: string) => {
    setValue(input);
    await getStationsSuggestions(input, setSuggestions, handleAutocompleteError);
  };

  const handleChooseOption = (option: StationSuggestion) => {
    setValue(option.name);
    onChooseOption(option);
    setSuggestions([]);
  };

  return (
    <div className="field field--autocomplete">
      <FormTextField
        title={fieldTitle}
        placeholder={fieldPlaceholder}
        onChange={(e) => handleInput(e.target.value)}
        value={value}
        error={error || autocompleteError}
        handleBlur={onBlur}
      />
      {suggestions && (
        <div className="suggestions">
          {suggestions.map((elt) => (
            <button
              className="suggestions__suggestion"
              type="button"
              key={elt.id}
              onClick={() => handleChooseOption(elt)}
            >
              <strong className="suggestion-title">{elt.name}</strong>
              <span className="suggestion-occupation">{elt.address}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StationsAutocompleteField;
