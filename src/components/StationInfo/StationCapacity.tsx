import { Subtitle } from '@/app/styled/Typography';
import { StationCapacityContainer } from './StationInfo.styles';

type Props = {
  capacity: number;
};

const StationCapacity = ({ capacity }: Props) => {
  return (
    <StationCapacityContainer>
      <Subtitle>Capacity</Subtitle>
      <div className="capacity-counter">
        <strong className="capacity-number">{capacity}</strong>
        <span className="capacity-description">Bikes</span>
      </div>
    </StationCapacityContainer>
  );
};

export default StationCapacity;
