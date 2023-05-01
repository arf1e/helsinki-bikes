import { StationCounted } from '@/app/types/stations';
import { StationTopStationsContainer } from './StationInfo.styles';
import { Subtitle } from '@/app/styled/Typography';
import TopStationsTable from './TopStationsTable';

type Props = {
  topStations: {
    fromHere: StationCounted[];
    toHere: StationCounted[];
  };
};

const StationTopStations = ({ topStations }: Props) => {
  return (
    <StationTopStationsContainer>
      <Subtitle>Stations</Subtitle>
      <ul className="top-stations-tables">
        <li className="top-stations-tables__table-container">
          <TopStationsTable top={topStations.fromHere} />
          <p className="top-stations-tables__table-description">
            Most popular return stations for journeys starting from this station
          </p>
        </li>
        <li className="top-stations-tables__table-container">
          <TopStationsTable top={topStations.toHere} />
          <p className="top-stations-tables__table-description">
            Most popular return stations for journeys ending at this station
          </p>
        </li>
      </ul>
    </StationTopStationsContainer>
  );
};

export default StationTopStations;
