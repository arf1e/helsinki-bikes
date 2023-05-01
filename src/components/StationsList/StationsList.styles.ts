import styled from 'styled-components';

const StationsListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
  min-height: ${({ theme }) => theme.minContainerHeight};
  padding: ${({ theme }) => theme.appBoxPadding};
`;

export default StationsListContainer;
