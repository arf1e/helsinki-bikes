import { Formik } from 'formik';
import styled from 'styled-components';
import { TSearchStations, initialSearchStationsValues, searchStationsSchema } from './SearchStations.utils';
import SInput from '@/app/styled/Input';
import { PrimaryButton } from '@/app/styled/Buttons';

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

type Props = {
  applyFilters: (filters: TSearchStations) => void;
};

const SearchStations = ({ applyFilters }: Props) => {
  return (
    <Formik initialValues={initialSearchStationsValues} validationSchema={searchStationsSchema} onSubmit={applyFilters}>
      {(formikProps) => (
        <SearchForm onSubmit={formikProps.handleSubmit}>
          <SInput
            placeholder="Search stations..."
            type="text"
            name="name"
            onChange={formikProps.handleChange}
            isInvalid={!!formikProps.errors.name}
          />
          <PrimaryButton type="submit">Q</PrimaryButton>
        </SearchForm>
      )}
    </Formik>
  );
};

export default SearchStations;
