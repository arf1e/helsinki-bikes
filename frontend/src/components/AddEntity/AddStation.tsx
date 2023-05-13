import Map from '../Map';
import { Title } from '@/app/styled/Typography';
import { Formik, FormikProps } from 'formik';
import FormTextField from '../FormField';
import { addStationInitialValues, stationValidationSchema } from './AddEntity.utils';
import { useState } from 'react';
import { GooglePlace } from '@/app/types/google';
import client from '@/app/common/api';
import { Coordinates } from '@/app/types/maps';
import PageHead from '../PageHead/PageHead';
import AddressAutocompleteField from './AddressAutocompleteField';
import { AddEntityForm, AddStationContainer } from './AddEntity.styles';
import { PrimaryButton, SecondaryButton } from '@/app/styled/Buttons';
import { FORM_STATE, FORM_STATE_IDLE, FORM_STATE_LOADING, TAddStationForm } from './AddEntity.types';
import useStatusBar from '@/app/hooks/useStatusBar';
import FormErrors from './FormErrors';
import { AxiosError } from 'axios';

const AddStation = () => {
  const [points, setPoints] = useState<Coordinates[]>([]);
  const [formState, setFormState] = useState<FORM_STATE>(FORM_STATE_IDLE);
  const [autocompleteError, setAutocompleteError] = useState('');

  const { notify } = useStatusBar();

  const chooseAutoCompleteOption = async (option: GooglePlace, formikProps: FormikProps<TAddStationForm>) => {
    setAutocompleteError('');
    formikProps.setFieldValue('address', option.main_text);
    await client
      .get('/lookup/coordinates', {
        params: {
          placeId: option.place_id,
        },
      })
      .then((response) => {
        const { lat, lng } = response.data;
        formikProps.setFieldValue('x', lng.toString());
        formikProps.setFieldValue('y', lat.toString());
        setPoints([{ x: lng, y: lat }]);
      })
      .catch((error: AxiosError) => {
        notify({ status: 'error', message: `Could not resolve address coordinates: ${error.message}` });
      });
  };

  const handleFormSubmit = async (values: TAddStationForm, resetForm: () => void) => {
    setFormState(FORM_STATE_LOADING);
    notify({ status: 'loading', message: 'Creating station...' });
    await client
      .post('/stations/add', values)
      .then((response) => {
        if (response.status === 201) {
          notify({ status: 'success', message: 'New station has been successfully created!' });
          setFormState(FORM_STATE_IDLE);
          resetForm();
          setPoints([]);
          setAutocompleteError('');
          return;
        }
        throw new Error('Unexpected response code. Please check Network tab in your devtools.');
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Failed to reach the server to create new station.';
        notify({ status: 'error', message });
        setFormState(FORM_STATE_IDLE);
      });
  };

  const handleFormReset = (e: any, resetHandler: (e: any) => void) => {
    setPoints([]);
    setAutocompleteError('');
    return resetHandler(e);
  };

  return (
    <AddStationContainer data-cy="add-station-form">
      <PageHead title="New Station" />
      <Formik
        onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
        validationSchema={stationValidationSchema}
        initialValues={addStationInitialValues}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(formikProps) => (
          <AddEntityForm onSubmit={formikProps.handleSubmit} aria-disabled={formState === FORM_STATE_LOADING}>
            <Title className="form-title">New Station</Title>
            <div className="field">
              <FormTextField
                title="Name"
                value={formikProps.values.name}
                onChange={formikProps.handleChange('name')}
                placeholder="Station name"
                handleBlur={formikProps.handleBlur('name')}
                error={formikProps.touched.name ? formikProps.errors.name : ''}
                data-cy="input-name"
              />
            </div>
            <AddressAutocompleteField
              onChooseOption={(option) => chooseAutoCompleteOption(option, formikProps)}
              value={formikProps.values.address}
              setValue={formikProps.handleChange('address')}
              error={formikProps.touched.address ? formikProps.errors.address : ''}
              handleBlur={formikProps.handleBlur('address')}
              autocompleteError={autocompleteError}
              setAutocompleteError={setAutocompleteError}
              testId="input-address"
            />
            <div className="field field--capacity">
              <FormTextField
                title="Capacity"
                value={formikProps.values.capacity}
                onChange={formikProps.handleChange('capacity')}
                error={formikProps.touched.capacity ? formikProps.errors.capacity : ''}
                handleBlur={formikProps.handleBlur('capacity')}
                placeholder="Number"
                data-cy="input-capacity"
              />
            </div>
            <div className="field field--city">
              <FormTextField
                title="City (optional)"
                value={formikProps.values.city}
                onChange={formikProps.handleChange('city')}
                error={formikProps.touched.city ? formikProps.errors.city : ''}
                handleBlur={formikProps.handleBlur('city')}
                placeholder="i.e. Espoo"
                data-cy="input-city"
              />
            </div>
            <div className="field field--operator">
              <FormTextField
                title="Operator (optional)"
                value={formikProps.values.operator}
                onChange={formikProps.handleChange('operator')}
                error={formikProps.touched.operator ? formikProps.errors.operator : ''}
                handleBlur={formikProps.handleBlur('operator')}
                placeholder="i.e. City Bike Finland"
                data-cy="input-operator"
              />
            </div>
            <FormErrors shouldDisplay={formikProps.submitCount > 0} errors={[formikProps.errors.x]} />
            <div className="form-controls">
              <PrimaryButton type="submit" disabled={formState === FORM_STATE_LOADING}>
                Apply
              </PrimaryButton>
              {formikProps.dirty && (
                <SecondaryButton
                  disabled={formState === FORM_STATE_LOADING}
                  type="reset"
                  onClick={(e: any) => handleFormReset(e, formikProps.handleReset)}
                >
                  Reset
                </SecondaryButton>
              )}
            </div>
          </AddEntityForm>
        )}
      </Formik>
      <Map initialZoom={11} points={points} />
    </AddStationContainer>
  );
};

export default AddStation;
