import { useEffect, useState } from 'react';
import { TFormValues } from '../components/FilterJourneys/FilterJourneys.utils';
import client from '../common/api';
import { JourneysApiResponse } from '../types/journeys';
import { composeQueryString } from '../common/hooks-utils';
import { AxiosError } from 'axios';

type TUseJourneysInput = {
  filters?: TFormValues;
  page?: number;
};

/**
 * This hook retrieves journeys from an API based on given filtering, sorting, and pagination options.
 * However, due to the limitations of React's dependency array in the useEffect hook,
 * it's not possible to use the filters object as a dependency since React's Object.is() function would continuously trigger API requests.
 * To work around this issue, the hook converts the filters and pagination options into a query string that can be used as a dependency in the useEffect hook.
 * This way, any changes to the filters or pagination options will trigger a new API request only when necessary,
 * avoiding excessive API calls.
 */
function useJourneys({ filters = {}, page = 1 }: TUseJourneysInput = {}) {
  const [data, setData] = useState<JourneysApiResponse>({ journeys: [], totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const queryString = composeQueryString(filters, page);

  useEffect(() => {
    setLoading(true);
    setError('');
    client
      .get(`journeys?${queryString}`)
      .then(({ data }: { data: JourneysApiResponse }) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setLoading(false);
      });
  }, [queryString]);

  const { journeys, totalPages } = data;

  return { journeys, totalPages, loading, error };
}

export default useJourneys;
