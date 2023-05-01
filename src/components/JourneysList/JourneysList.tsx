import Pagination from '../Pagination/Pagination';
import JourneysTable from '../JourneysTable/JourneysTable';
import { Journey } from '@/app/types/journeys';
import { PaginationProps } from '@/app/types/pagination';
import { SList } from './JourneysList.styles';

type Props = {
  journeys: Journey[];
  pagination: PaginationProps;
  loading: boolean;
};

const JourneysList = ({ journeys, pagination, loading }: Props) => {
  return (
    <SList>
      <JourneysTable journeys={journeys} />
      <div className="pagination-container">
        <Pagination pagination={pagination} disabled={loading} />
      </div>
    </SList>
  );
};

export default JourneysList;
