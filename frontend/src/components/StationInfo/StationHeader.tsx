import Link from 'next/link';
import Chevron from '@/app/assets/svg/chevron.svg';
import { StationHeaderContainer } from './StationInfo.styles';
import { Title } from '@/app/styled/Typography';
import PageHead from '../PageHead/PageHead';

type Props = {
  name: string;
  address: string;
};

const StationHeader = ({ name, address }: Props) => {
  return (
    <StationHeaderContainer>
      <PageHead title={name} />
      <Link className="navigation-link" href="/stations">
        <Chevron width={12} height={12} viewBox="0 0 20 20" className="navigation-link__icon" />
        <span className="navigation-link__text">Back to Stations List</span>
      </Link>
      <Title className="station-title">{name}</Title>
      <p className="station-address">{address}</p>
    </StationHeaderContainer>
  );
};

export default StationHeader;
