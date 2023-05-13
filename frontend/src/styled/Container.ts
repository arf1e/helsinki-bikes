import styled from 'styled-components';

const Container = styled.div`
  width: ${({ theme }) => theme.minContainerDesktopWidth};
  margin: 0 auto;
`;

export default Container;
