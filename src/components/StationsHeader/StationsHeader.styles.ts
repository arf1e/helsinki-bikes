import styled from 'styled-components';

const StationsHeaderContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.appBoxPadding};
  display: flex;
  justify-content: space-between;
  border-bottom: 4px solid ${({ theme }) => theme.appBackgroundColor};

  button[type='submit'] {
    margin-left: 8px;
  }
`;

export default StationsHeaderContainer;
