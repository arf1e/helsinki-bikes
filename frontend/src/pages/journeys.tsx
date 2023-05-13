import useJourneys from '../hooks/useJourneys';
import FilterJourneys from '../components/FilterJourneys';
import JourneysList from '../components/JourneysList/JourneysList';
import { TFormValues, initialJourneysFormValues } from '../components/FilterJourneys/FilterJourneys.utils';
import { PaginationProps } from '../types/pagination';
import PageHead from '../components/PageHead/PageHead';
import JourneysPageContainer from '../styled/JourneysPageContainer';
import useFilters from '../hooks/useFilters';
import { useEffect } from 'react';
import useStatusBar from '../hooks/useStatusBar';

export default function Journeys() {
  const { filters, applyFilters, page, setPage } = useFilters<TFormValues>(initialJourneysFormValues);
  const { journeys, totalPages, loading, error } = useJourneys({ filters, page });
  const { notify, closeStatusBar } = useStatusBar();

  useEffect(() => {
    if (loading) {
      notify({ status: 'loading', message: 'Loading journeys...' });
    } else if (error) {
      notify({ status: 'error', message: `Failed to load journeys: ${error}` });
    } else {
      closeStatusBar();
    }
    return () => {
      closeStatusBar();
    };
  }, [loading, error, notify, closeStatusBar]);

  const pagination: PaginationProps = {
    currentPage: page,
    setPage,
    totalPages,
  };

  return (
    <>
      <PageHead title="Journeys" />
      <JourneysPageContainer>
        <FilterJourneys applyFilters={applyFilters} loading={loading} />
        <JourneysList journeys={journeys} pagination={pagination} loading={loading} />
      </JourneysPageContainer>
    </>
  );
}
