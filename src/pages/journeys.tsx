import useJourneys from '../hooks/useJourneys';
import FilterJourneys from '../components/FilterJourneys';
import JourneysList from '../components/JourneysList/JourneysList';
import { TFormValues, initialJourneysFormValues } from '../components/FilterJourneys/FilterJourneys.utils';
import { PaginationProps } from '../types/pagination';
import PageHead from '../components/PageHead/PageHead';
import JourneysPageContainer from '../styled/JourneysPageContainer';
import useFilters from '../hooks/useFilters';

export default function Journeys() {
  const { filters, applyFilters, page, setPage } = useFilters<TFormValues>(initialJourneysFormValues);
  const { journeys, totalPages } = useJourneys({ filters, page });

  const pagination: PaginationProps = {
    currentPage: page,
    setPage,
    totalPages,
  };

  return (
    <>
      <PageHead title="Journeys" />
      <JourneysPageContainer>
        <FilterJourneys applyFilters={applyFilters} />
        <JourneysList journeys={journeys} pagination={pagination} />
      </JourneysPageContainer>
    </>
  );
}
