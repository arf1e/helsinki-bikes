import PageHead from '@/app/components/PageHead/PageHead';
import { TSearchStations, initialSearchStationsValues } from '@/app/components/SearchStations/SearchStations.utils';
import StationsHeader from '@/app/components/StationsHeader';
import StationsList from '@/app/components/StationsList/StationsList';
import useFilters from '@/app/hooks/useFilters';
import useStations from '@/app/hooks/useStations';
import StationsPageContainer from '@/app/styled/StationsPageContainer';
import { PaginationProps } from '@/app/types/pagination';
import { useState } from 'react';

const Stations = () => {
  const { filters, applyFilters, page, setPage } = useFilters<TSearchStations>(initialSearchStationsValues);
  const { stations, totalPages } = useStations({ filters, page });

  const pagination: PaginationProps = {
    currentPage: page,
    setPage,
    totalPages,
  };

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
