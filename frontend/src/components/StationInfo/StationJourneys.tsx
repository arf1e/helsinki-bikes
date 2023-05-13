import { Subtitle } from '@/app/styled/Typography';
import { StationJourneysContainer } from './StationInfo.styles';

type Props = {
  journeysCount: {
    fromHere: number;
    toHere: number;
  };
};

const StationJourneys = ({ journeysCount }: Props) => {
  return (
    <StationJourneysContainer>
      <Subtitle>Journeys</Subtitle>
      <ul className="journeys-counters">
        <li className="journeys-counter">
          <strong className="journeys-counter__number">{journeysCount.fromHere}</strong>
          <p className="journeys-counter__description">Journeys starting from this station</p>
        </li>
        <li className="journeys-counter">
          <strong className="journeys-counter__number">{journeysCount.toHere}</strong>
          <p className="journeys-counter__description">Journeys ending at this station</p>
        </li>
      </ul>
    </StationJourneysContainer>
  );
};

export default StationJourneys;
