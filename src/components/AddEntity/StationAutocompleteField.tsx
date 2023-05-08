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
    clearError: () => void,
  ) => {
    return client
      .get<any, { data: StationsSuggestionsApiResponse }>('/lookup/stations', {
        params: { name },
      })
      .then(({ data }: { data: StationSuggestion[] }) => {
        dataHandler(data);
        clearError();
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
  autocompleteError: string;
  setAutocompleteError: (error: string) => void;
  onBlur: (e: any) => void;
  testId?: string;
};

const StationAutocompleteField = ({
  onChooseOption,
  value,
  setValue,
  fieldTitle,
  fieldPlaceholder,
  error,
  setAutocompleteError,
  autocompleteError,
  onBlur,
  testId,
}: Props) => {
  const [suggestions, setSuggestions] = useState<StationSuggestion[]>([]);

  const handleAutocompleteError = (error: AxiosError) => {
    setAutocompleteError(`Unable to find station: ${error.message}`);
  };

  const clearAutocompleteError = () => {
    setAutocompleteError('');
  };

  const handleInput = async (input: string) => {
    setValue(input);
    await getStationsSuggestions(input, setSuggestions, handleAutocompleteError, clearAutocompleteError);
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
        data-cy={testId}
        handleBlur={onBlur}
      />
      {value.length > 0 && suggestions && (
        <div className="suggestions">
          {suggestions.map((elt) => (
            <button
              className="suggestions__suggestion"
              type="button"
              key={elt.id}
              data-cy={`suggestion-${elt.id}`}
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

export default StationAutocompleteField;
