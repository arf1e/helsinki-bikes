import SearchStations from '../SearchStations/SearchStations';
import Pagination from '../Pagination/Pagination';
import { PaginationProps } from '@/app/types/pagination';
import { TSearchStations } from '../SearchStations/SearchStations.utils';
import StationsHeaderContainer from './StationsHeader.styles';

type Props = {
  pagination: PaginationProps;
  applyFilters: (filters: TSearchStations) => void;
};

const StationsHeader = ({ pagination, applyFilters }: Props) => {
  return (
    <StationsHeaderContainer>
      <SearchStations applyFilters={applyFilters} />
      <Pagination pagination={pagination} />
    </StationsHeaderContainer>
  );
};

export default StationsHeader;
