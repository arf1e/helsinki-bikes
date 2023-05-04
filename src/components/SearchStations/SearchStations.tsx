import { Formik } from 'formik';
import { TSearchStations, initialSearchStationsValues, searchStationsSchema } from './SearchStations.utils';
import SInput from '@/app/styled/Input';
import SearchIcon from '@/app/assets/svg/search.svg';
import { PrimaryButton } from '@/app/styled/Buttons';
import SearchForm from './SearchStations.styles';

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
          <PrimaryButton type="submit" disabled={Boolean(formikProps.errors.name)}>
            <SearchIcon width={14} height={14} viewBox="0 0 20 20" />
          </PrimaryButton>
        </SearchForm>
      )}
    </Formik>
  );
};

export default SearchStations;
