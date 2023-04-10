import { metersToKms, secondsToMinutes } from '@/app/common/converters';
import { Journey } from '@/app/types/journeys';
import { STable } from './JourneysTable.styles';

type Props = {
  journeys: Journey[];
};

const JourneysTable = ({ journeys }: Props) => {
  return (
    <STable>
      <thead>
        <tr>
          <th className="departure">Departure station</th>
          <th className="return">Return station</th>
          <th className="distance">Distance, km</th>
          <th className="duration">Duration, minutes</th>
        </tr>
      </thead>
      <tbody>
        {journeys &&
          journeys.map((journey) => (
            <tr className="journey-row" key={journey.id}>
              <td>{journey.departure.name}</td>
              <td>{journey.return.name}</td>
              <td>{metersToKms(journey.distance)}</td>
              <td>{secondsToMinutes(journey.duration)}</td>
            </tr>
          ))}
      </tbody>
    </STable>
  );
};

export default JourneysTable;
