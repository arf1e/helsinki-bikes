import PageHead from '@/app/components/PageHead/PageHead';
import { TSearchStations, initialSearchStationsValues } from '@/app/components/SearchStations/SearchStations.utils';
import StationsHeader from '@/app/components/StationsHeader';
import StationsList from '@/app/components/StationsList/StationsList';
import useFilters from '@/app/hooks/useFilters';
import useStations from '@/app/hooks/useStations';
import useStatusBar from '@/app/hooks/useStatusBar';
import StationsPageContainer from '@/app/styled/StationsPageContainer';
import { PaginationProps } from '@/app/types/pagination';
import { useEffect } from 'react';

const Stations = () => {
  const { filters, applyFilters, page, setPage } = useFilters<TSearchStations>(initialSearchStationsValues);
  const { stations, totalPages, loading, error } = useStations({ filters, page });
  const { notify, closeStatusBar } = useStatusBar();

  const pagination: PaginationProps = {
    currentPage: page,
    setPage,
    totalPages,
  };

  useEffect(() => {
    if (loading) {
      notify({ status: 'loading', message: 'Loading stations...' });
    } else if (error) {
      notify({ status: 'error', message: `Failed to load stations: ${error}` });
    } else {
      closeStatusBar();
    }

    return () => {
      closeStatusBar();
    };
  }, [loading, error, notify, closeStatusBar]);

  return (
    <>
      <PageHead title="Stations" />
      <StationsPageContainer>
        <StationsHeader pagination={pagination} applyFilters={applyFilters} />
        <StationsList stations={stations} />
      </StationsPageContainer>
    </>
  );
};

export default Stations;
