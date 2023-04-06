import styled from 'styled-components';

const SList = styled.div`
  flex: 3;
  display: flex;
  padding: ${({ theme }) => theme.appBoxPadding};
`;

const JourneysList = () => {
  return (
    <SList>
      <h2>Journeys</h2>
    </SList>
  );
};

export default JourneysList;
