import { ReactNode } from 'react';
import styled from 'styled-components';
import Container from '../Container/Container';

const SBackground = styled.section`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: ${({ theme }) => theme.appBoxPadding};
  display: flex;
`;

type Props = {
  children: ReactNode;
};

const Background = ({ children }: Props) => {
  return (
    <Container>
      <SBackground>{children}</SBackground>
    </Container>
  );
};

export default Background;
