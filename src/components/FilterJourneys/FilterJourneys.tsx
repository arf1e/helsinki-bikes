import { Subtitle } from '@/app/styled/Typography';
import { FormField, NumberField, SFilters } from './FilterJourneys.styles';
import SortingSwitch from './SortingSwitch';
import { PrimaryButton, SecondaryButton } from '@/app/styled/Buttons';
import { Formik, FormikProps } from 'formik';
import {
  ORDER_ASCENDING,
  ORDER_DESCENDING,
  SORT_BY_DISTANCE,
  SORT_BY_DURATION,
  TFormValues,
  initialJourneysFormValues,
  journeysFilterSchema,
} from './FilterJourneys.utils';

type Props = {
  applyFilters: (filters: TFormValues) => void;
};

const FilterJourneys = ({ applyFilters }: Props) => {
  const resetForm = (formikProps: FormikProps<TFormValues>) => {
    formikProps.resetForm();
    formikProps.submitForm();
  };

  return (
    <Formik
      initialValues={initialJourneysFormValues}
      validationSchema={journeysFilterSchema}
      onSubmit={(values) => applyFilters(values)}
    >
      {(formikProps) => (
        <SFilters onSubmit={formikProps.handleSubmit}>
          <fieldset className="form-section">
            <Subtitle className="fieldset-title">Stations</Subtitle>
            <div className="field-header">
              <span className="field-title">Departure</span>
            </div>
            <div className="input-line">
              <FormField
                type="text"
                isInvalid={!!formikProps.errors.departureStationName}
                name="departureStationName"
                onChange={formikProps.handleChange}
                value={formikProps.values.departureStationName}
                placeholder="Start typing..."
              />
            </div>
            <div className="field-header">
              <span className="field-title">Return</span>
            </div>
            <div className="input-line">
              <FormField
                type="text"
                name="returnStationName"
                isInvalid={!!formikProps.errors.returnStationName}
                onChange={formikProps.handleChange}
                value={formikProps.values.returnStationName}
                placeholder="Start typing..."
              />
            </div>
          </fieldset>
          <fieldset className="form-section">
            <Subtitle className="fieldset-title">Filters</Subtitle>
            <div className="field-header">
              <span className="field-title">Distance, km</span>
            </div>
            <div className="input-line">
              <NumberField
                type="text"
                isInvalid={!!formikProps.errors.minDistance}
                name="minDistance"
                value={formikProps.values.minDistance}
                onChange={formikProps.handleChange}
                placeholder="min"
              />

              <div className="input-line__spacer" />
              <NumberField
                type="text"
                placeholder="max"
                isInvalid={!!formikProps.errors.maxDistance}
                name="maxDistance"
                value={formikProps.values.maxDistance}
                onChange={formikProps.handleChange}
              />
            </div>
            <div className="field-header">
              <span className="field-title">Duration, minutes</span>
            </div>
            <div className="input-line">
              <NumberField
                isInvalid={!!formikProps.errors.minDuration}
                type="text"
                placeholder="min"
                name="minDuration"
                value={formikProps.values.minDuration}
                onChange={formikProps.handleChange}
              />
              <div className="input-line__spacer" />
              <NumberField
                type="text"
                placeholder="max"
                isInvalid={!!formikProps.errors.maxDuration}
                name="maxDuration"
                value={formikProps.values.maxDuration}
                onChange={formikProps.handleChange}
              />
            </div>
          </fieldset>
          <fieldset className="form-section">
            <Subtitle className="fieldset-title">Sorting</Subtitle>
            <div className="field-header">
              <span className="field-title">Sort by</span>
            </div>
            <div className="input-line">
              <SortingSwitch
                value={formikProps.values.sortBy}
                handleChange={formikProps.handleChange('sortBy')}
                options={[
                  { title: 'Distance', value: SORT_BY_DISTANCE },
                  { title: 'Duration', value: SORT_BY_DURATION },
                ]}
              />
            </div>
            <div className="field-header">
              <span className="field-title">Order</span>
            </div>
            <div className="input-line">
              <SortingSwitch
                value={formikProps.values.sortOrder}
                handleChange={formikProps.handleChange('sortOrder')}
                options={[
                  { title: 'Asc', value: ORDER_ASCENDING },
                  { title: 'Desc', value: ORDER_DESCENDING },
                ]}
              />
            </div>
          </fieldset>
          <div className="form-controls">
            <PrimaryButton type="submit">Apply</PrimaryButton>
            {formikProps.dirty && (
              <SecondaryButton type="reset" onClick={() => resetForm(formikProps)}>
                Reset
              </SecondaryButton>
            )}
          </div>
        </SFilters>
      )}
    </Formik>
  );
};

export default FilterJourneys;
