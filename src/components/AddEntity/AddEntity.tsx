import { ADD_ENTITY, ADD_STATION } from '@/app/types/add';
import { useState } from 'react';
import styled from 'styled-components';
import EntitySwitch from './EntitySwitch';
import EntityForm from './EntityForm';

const AddEntityContainer = styled.section`
  min-height: 60vh;
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const AddEntity = () => {
  const [entity, setEntity] = useState<ADD_ENTITY>(ADD_STATION);

  return (
    <AddEntityContainer>
      <EntitySwitch entity={entity} setEntity={setEntity} />
      <EntityForm entity={entity} />
    </AddEntityContainer>
  );
};

export default AddEntity;
