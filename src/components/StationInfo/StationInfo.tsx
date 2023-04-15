import { StationSingle } from '@/app/types/stations';
import StationHeader from './StationHeader';
import { StationInfoContainer } from './StationInfo.styles';
import StationJourneys from './StationJourneys';
import StationTopStations from './StationTopStations';

type Props = {
  station: StationSingle;
};

const StationInfo = ({ station }: Props) => {
  return (
    <StationInfoContainer>
      <StationHeader name={station.name} address={station.address} />
      <StationJourneys journeysCount={station.journeysCount} />
      <StationTopStations topStations={station.topStations} />
    </StationInfoContainer>
  );
};

export default StationInfo;
