import SBackground from './Background.styles';
import Container from '@/app/styled/Container';
import { ReactNode } from 'react';

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
