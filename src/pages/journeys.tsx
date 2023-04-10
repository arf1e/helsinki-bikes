import useJourneys from '../hooks/useJourneys';
import FilterJourneys from '../components/FilterJourneys';
import JourneysList from '../components/JourneysList/JourneysList';
import { useState } from 'react';
import { TFormValues, initialJourneysFormValues } from '../components/FilterJourneys/FilterJourneys.utils';
import { PaginationProps } from '../types/pagination';
import PageHead from '../components/PageHead/PageHead';
import JourneysPageContainer from '../styled/JourneysPageContainer';

export default function Journeys() {
  const [filters, setFilters] = useState<TFormValues>(initialJourneysFormValues);
  const [page, setPage] = useState(1);
  const { journeys, totalPages } = useJourneys({ filters, page });

  const updateFilters = (filters: TFormValues) => {
    setFilters(filters);
    setPage(1);
  };

  const pagination: PaginationProps = {
    currentPage: page,
    setPage,
    totalPages,
  };

  return (
    <>
      <PageHead title="Journeys" />
      <JourneysPageContainer>
        <FilterJourneys applyFilters={updateFilters} />
        <JourneysList journeys={journeys} pagination={pagination} />
      </JourneysPageContainer>
    </>
  );
}
