import Pagination from '../Pagination/Pagination';
import JourneysTable from '../JourneysTable/JourneysTable';
import { Journey } from '@/app/types/journeys';
import { PaginationProps } from '@/app/types/pagination';
import { SList } from './JourneysList.styles';
import { useEffect } from 'react';

type Props = {
  journeys: Journey[];
  pagination: PaginationProps;
};

const JourneysList = ({ journeys, pagination }: Props) => {
  return (
    <SList>
      <JourneysTable journeys={journeys} />
      <div className="pagination-container">
        <Pagination pagination={pagination} />
      </div>
    </SList>
  );
};

export default JourneysList;
