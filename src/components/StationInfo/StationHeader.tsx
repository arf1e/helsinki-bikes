import Link from 'next/link';
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
        Back to Stations List
      </Link>
      <Title className="station-title">{name}</Title>
      <p className="station-address">{address}</p>
    </StationHeaderContainer>
  );
};

export default StationHeader;
