import styled from 'styled-components';

const SBackground = styled.section`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: ${({ theme }) => theme.appBoxPadding};
  display: flex;
  flex-direction: column;

  .screen {
    display: flex;
  }
`;

export default SBackground;
