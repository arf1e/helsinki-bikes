import { useRouter } from 'next/router';
import Container from '../Container/Container';
import NavigationElement from './NavigationElement';
import styled from 'styled-components';

const SNavigation = styled.nav`
  display: flex;
  margin-top: 48px;
  margin-bottom: 32px;

  ul {
    display: flex;
    flex-direction: row;

    list-style: none;
  }
`;

const Navigation = () => {
  const router = useRouter();
  return (
    <Container>
      <SNavigation>
        <ul>
          <NavigationElement title="Journeys" route="/" />
          <NavigationElement title="Stations" route="/stations" />
          <NavigationElement title="Add" route="/add" />
        </ul>
      </SNavigation>
    </Container>
  );
};

export default Navigation;
