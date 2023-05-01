import { useEffect, useState } from 'react';
import { TSearchStations } from '../components/SearchStations/SearchStations.utils';
import { StationsApiResponse } from '../types/stations';
import { composeQueryString } from '../common/hooks-utils';
import client from '../common/api';
import { AxiosError } from 'axios';

type TUseStationsInput = {
  filters: TSearchStations;
  page: number;
};

/**
 * This hook retrieves stations from an API based on given filtering and pagination options.
 */
function useStations({ filters = {}, page = 1 }: TUseStationsInput) {
  const [data, setData] = useState<StationsApiResponse>({ stations: [], totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const queryString = composeQueryString(filters, page);

  useEffect(() => {
    setLoading(true);
    client
      .get(`stations?${queryString}`)
      .then(({ data }: { data: StationsApiResponse }) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setLoading(false);
      });
  }, [queryString]);

  const { stations, totalPages } = data;

  return { stations, totalPages, loading, error };
}

export default useStations;
