import styled from 'styled-components';
import Map from '../Map';

const AddJourneyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: space-between;

  .form-container {
    flex: 1;
  }
`;

const AddJourney = () => {
  return (
    <AddJourneyContainer>
      <div className="form-container">Journey Form</div>
      <Map />
    </AddJourneyContainer>
  );
};

export default AddJourney;
