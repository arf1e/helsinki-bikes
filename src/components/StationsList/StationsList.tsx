import { StationShort } from '@/app/types/stations';
import StationCard from '../StationCard';
import StationsListContainer from './StationsList.styles';

type Props = {
  stations: StationShort[];
};

const StationsList = ({ stations }: Props) => {
  return (
    <StationsListContainer>
      {stations.map((station) => (
        <StationCard station={station} key={station.id} />
      ))}
    </StationsListContainer>
  );
};

export default StationsList;
