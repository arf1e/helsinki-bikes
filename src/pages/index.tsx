import Head from 'next/head';
import Container from '../components/Container/Container';
import useJourneys from '../hooks/useJourneys';
import FilterJourneys from '../components/FilterJourneys';
import JourneysList from '../components/JourneysList/JourneysList';
import styled from 'styled-components';

const PageContainer = styled.main`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`;

export default function Journeys() {
  const { journeys, loading, error } = useJourneys();
  return (
    <>
      <Head>
        <title>Journeys | Bike App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageContainer>
        <FilterJourneys />
        <JourneysList />
      </PageContainer>
    </>
  );
}
