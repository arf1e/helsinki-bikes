import { StationShort } from '@/app/types/stations';
import AddressIcon from '@/app/assets/svg/address.svg';
import StationCardContainer from './StationCard.styles';
type Props = {
  station: StationShort;
};

const StationCard = ({ station }: Props) => {
  return (
    <StationCardContainer href={`stations/${station.id}`}>
      <strong className="station-name">{station.name}</strong>
      <div className="station-address-container">
        <AddressIcon className="address-icon" width={12} height={12} viewBox="0 0 20 20" />
        <span className="station-address">{station.address}</span>
      </div>
    </StationCardContainer>
  );
};

export default StationCard;
