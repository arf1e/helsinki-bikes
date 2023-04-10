import NavigationElement from './NavigationElement';
import Container from '@/app/styled/Container';
import Nav from '@/app/styled/Nav';

const Navigation = () => {
  return (
    <Container>
      <Nav>
        <ul>
          <NavigationElement title="Journeys" route="/journeys" />
          <NavigationElement title="Stations" route="/stations" />
          <NavigationElement title="Add" route="/add" />
        </ul>
      </Nav>
    </Container>
  );
};

export default Navigation;
