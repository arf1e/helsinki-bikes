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
  const { journeys, totalPages, loading } = useJourneys({ filters, page });
  const { notify, closeStatusBar } = useStatusBar();

  useEffect(() => {
    loading ? notify({ status: 'loading', message: 'Loading journeys...' }) : closeStatusBar();
    return () => {
      closeStatusBar();
    };
  }, [loading, notify, closeStatusBar]);

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
