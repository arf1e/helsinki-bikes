import { useEffect, useState } from 'react';
import { TFormValues } from '../components/FilterJourneys/FilterJourneys.utils';
import client from '../common/api';
import { JourneysApiResponse } from '../types/journeys';

type TUseJourneysInput = {
  filters?: TFormValues;
  page?: number;
};

/**
 * This function constructs query string from given filtering and pagination values for further use in the useJourneys hook.
 * @param filters - Object containing filtering & sorting form values
 * @param page - Current page number
 * @returns Query string composed from given form values and page number
 */
const composeJourneysQueryString = (filters: TFormValues, page: number) => {
  const queryObject = new URLSearchParams();
  queryObject.set('page', page.toString());

  for (const [key, value] of Object.entries(filters)) {
    if (Boolean(value) === true) {
      queryObject.set(key, value);
    }
  }

  const queryString = queryObject.toString();
  return queryString;
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
  const [error, setError] = useState(null);

  const queryString = composeJourneysQueryString(filters, page);

  useEffect(() => {
    client
      .get(`journeys?${queryString}`)
      .then(({ data }: { data: JourneysApiResponse }) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [queryString]);

  const { journeys, totalPages } = data;

  return { journeys, totalPages, loading, error };
}

export default useJourneys;
