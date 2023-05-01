import { Title } from '@/app/styled/Typography';
import { StationApiError } from '@/app/types/stations';
import Link from 'next/link';
import PageHead from '../PageHead/PageHead';
import StationErrorContainer from './StationError.styles';

type Props = {
  error: StationApiError;
};

const StationError = ({ error }: Props) => {
  return (
    <StationErrorContainer>
      <Title className="error-title">Houston, we have a problem!</Title>
      <PageHead title="Error" />
      <p className="error-message">{error.message}</p>
      <Link href="/stations" className="error-link">
        Go back to Stations List
      </Link>
    </StationErrorContainer>
  );
};

export default StationError;
