import { ReactNode } from 'react';
import styled from 'styled-components';

const SContainer = styled.div`
  width: ${({ theme }) => theme.minContainerDesktopWidth};
  margin: 0 auto;
`;

const Container = ({ children }: { children: ReactNode }) => {
  return <SContainer>{children}</SContainer>;
};

export default Container;
