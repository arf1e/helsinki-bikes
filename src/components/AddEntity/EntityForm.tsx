import { ADD_ENTITY, ADD_JOURNEY, ADD_STATION } from '@/app/types/add';
import styled from 'styled-components';
import AddStation from './AddStation';
import AddJourney from './AddJourney';

const EntityFormContainer = styled.div`
  display: flex;
  flex: 5;
`;

type Props = {
  entity: ADD_ENTITY;
};

const EntityForm = ({ entity }: Props) => {
  const entityMapper = {
    [ADD_STATION]: () => <AddStation />,
    [ADD_JOURNEY]: () => <AddJourney />,
  };

  const renderFormForCurrentEntity = entityMapper[entity];

  return <EntityFormContainer>{renderFormForCurrentEntity()}</EntityFormContainer>;
};

export default EntityForm;
