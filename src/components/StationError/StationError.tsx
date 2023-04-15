import { Title } from '@/app/styled/Typography';
import { StationApiError } from '@/app/types/stations';
import Link from 'next/link';
import styled from 'styled-components';
import PageHead from '../PageHead/PageHead';

type Props = {
  error: StationApiError;
};

const StationErrorContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  padding: ${({ theme }) => theme.appBoxPadding};
  min-height: 50vh;

  .error-title {
    color: ${({ theme }) => theme.darkGrayColor};
    margin-bottom: 16px;
  }

  .error-message {
    margin-bottom: 12px;
  }

  .error-link {
    text-decoration: none;
    color: ${({ theme }) => theme.primaryColor};
    transition: 0.3s;
    padding: 12px 24px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.secondaryColor};

    &:hover {
      color: ${({ theme }) => theme.backgroundColor};
      background-color: ${({ theme }) => theme.primaryColor};
    }
  }
`;

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
