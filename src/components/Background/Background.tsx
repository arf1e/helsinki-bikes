import SBackground from './Background.styles';
import Container from '@/app/styled/Container';
import { ReactNode } from 'react';
import StatusBar from '../StatusBar/StatusBar';

type Props = {
  children: ReactNode;
};

const Background = ({ children }: Props) => {
  return (
    <Container>
      <SBackground>
        <StatusBar />
        <div className="screen">{children}</div>
      </SBackground>
    </Container>
  );
};

export default Background;
