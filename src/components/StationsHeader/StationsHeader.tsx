import styled from 'styled-components';
import SearchStations from '../SearchStations/SearchStations';
import Pagination from '../Pagination/Pagination';
import { PaginationProps } from '@/app/types/pagination';
import { TSearchStations } from '../SearchStations/SearchStations.utils';

const StationsHeaderContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.appBoxPadding};
  display: flex;
  justify-content: space-between;
  border-bottom: 4px solid ${({ theme }) => theme.appBackgroundColor};

  button[type='submit'] {
    margin-left: 8px;
  }
`;

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
