import { StationShort } from '@/app/types/stations';
import styled from 'styled-components';
import StationCard from '../StationCard/StationCard';

const StationsListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
  min-height: 40vh;
  padding: ${({ theme }) => theme.appBoxPadding};
`;

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
