import { StationSingle } from '@/app/types/stations';
import styled from 'styled-components';
import StationInfo from '../StationInfo';
import Map from '../Map';

type Props = {
  station: StationSingle;
};

const StationViewContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  min-height: 750px;
`;

const StationView = ({ station }: Props) => {
  const { x, y } = station;
  return (
    <StationViewContainer>
      <StationInfo station={station} />
      <Map points={[{ x, y }]} />
    </StationViewContainer>
  );
};

export default StationView;
