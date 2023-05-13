import { useState } from 'react';
import FormTextField from '../FormField/FormField';
import debounce from 'lodash.debounce';
import client from '@/app/common/api';
import { AxiosError } from 'axios';

type Props<Suggestion, SuggestionsApiResponse> = {
  url: string;
  dataHandler: (data: SuggestionsApiResponse) => Suggestion[];
  fieldTitle: string;
  fieldPlaceholder: string;
  value: string;
  setValue: (value: string) => void;
  handleBlur: (e: any) => void;
  onChooseOption: (option: Suggestion) => void;
  error?: string;
  setError: (error: string) => void;
  apiParameter: string;
  debounceWait?: number;
};

const AutocompleteField = <Suggestion, SuggestionsApiResponse>({
  url,
  dataHandler,
  fieldTitle,
  fieldPlaceholder,
  value,
  setValue,
  handleBlur,
  onChooseOption,
  error,
  apiParameter,
  setError,
  debounceWait = 200,
}: Props<Suggestion, SuggestionsApiResponse>) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const getSuggestions = debounce(
    async (value) =>
      client
        .get<any, { data: SuggestionsApiResponse }>(url, { params: { [apiParameter]: value } })
        .then(({ data }) => {
          const suggestions = dataHandler(data);
          setSuggestions(suggestions);
        })
        .catch((e: AxiosError) => setError(`Failed to get autocomplete results: ${e.message}`)),
    debounceWait,
  );

  return (
    <div className="field field--autocomplete">
      <FormTextField
        title={fieldTitle}
        value={value}
        handleBlur={handleBlur}
        placeholder={fieldPlaceholder}
        error={error}
        onChange={(e) => setValue(e.target.value)}
      />
      {suggestions && <div className="suggestions"></div>}
    </div>
  );
};
