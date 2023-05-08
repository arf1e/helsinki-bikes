import { useState } from 'react';
import FormTextField from '../FormField';
import client from '@/app/common/api';
import { GoogleAutocompleteApiResponse, GooglePlace } from '@/app/types/google';
import debounce from 'lodash.debounce';
import { AxiosError } from 'axios';

const getGoogleAutocompleteSuggestions = debounce(
  async (
    input = '',
    dataHandler: (suggestions: GooglePlace[]) => void,
    handleError: (error: AxiosError) => void,
    clearError: () => void,
  ) => {
    return client
      .get<any, { data: GoogleAutocompleteApiResponse }>('/lookup/autocomplete', {
        params: { input },
      })
      .then(({ data }: { data: { predictions: GooglePlace[] } }) => {
        const { predictions: suggestions } = data;
        dataHandler(suggestions);
        clearError();
      })
      .catch(handleError);
  },
  200,
);

type Props = {
  value: string;
  setValue: (value: string) => void;
  onChooseOption: (option: GooglePlace) => void;
  error?: string;
  handleBlur: (e: any) => void;
  autocompleteError: string;
  setAutocompleteError: (error: string) => void;
  testId?: string;
};

const AddressAutocompleteField = ({
  onChooseOption,
  value,
  setValue,
  error,
  autocompleteError,
  setAutocompleteError,
  handleBlur,
  testId,
}: Props) => {
  const [placesSuggestions, setPlacesSuggestions] = useState<GooglePlace[]>([]);

  const handleAutocompleteError = (error: AxiosError) => {
    setAutocompleteError(`Failed to get autocomplete results: ${error.message}`);
  };

  const clearAutocompleteError = () => {
    setAutocompleteError('');
  };

  const handleInput = async (input: string) => {
    setValue(input);
    await getGoogleAutocompleteSuggestions(
      input,
      setPlacesSuggestions,
      handleAutocompleteError,
      clearAutocompleteError,
    );
  };

  const handleChooseOption = (option: GooglePlace) => {
    setValue(option.main_text);
    onChooseOption(option);
    setPlacesSuggestions([]);
  };

  return (
    <div className="field field--autocomplete">
      <FormTextField
        title="Address"
        value={value}
        data-cy={testId}
        handleBlur={handleBlur}
        error={error || autocompleteError}
        onChange={(e) => handleInput(e.target.value)}
        placeholder="Start typing and choose an option"
      />
      {value.length > 0 && placesSuggestions && (
        <div className="suggestions">
          {placesSuggestions.map((elt) => (
            <button
              className="suggestions__suggestion"
              type="button"
              data-cy={`suggestion--${elt.place_id}`}
              key={elt.place_id}
              onClick={() => handleChooseOption(elt)}
            >
              <strong className="suggestion-title">{elt.main_text}</strong>
              <span className="suggestion-occupation">{elt.secondary_text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressAutocompleteField;
