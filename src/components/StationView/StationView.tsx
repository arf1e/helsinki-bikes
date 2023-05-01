import { StationSingle } from '@/app/types/stations';
import StationInfo from '../StationInfo';
import Map from '../Map';
import StationViewContainer from './StationView.styles';

type Props = {
  station: StationSingle;
};

const StationView = ({ station }: Props) => {
  const { x, y } = station;
  return (
    <StationViewContainer>
      <StationInfo station={station} />
      <Map points={[{ x, y }]} initialCenter={{ x, y }} />
    </StationViewContainer>
  );
};

export default StationView;
