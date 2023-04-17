import Map from '../Map';
import { Title } from '@/app/styled/Typography';
import { Formik, FormikProps } from 'formik';
import FormTextField from '../FomField/FormFIeld';
import { TAddStationForm, addStationInitialValues, stationValidationSchema } from './AddEntity.utils';
import { useState } from 'react';
import { GooglePlace } from '@/app/types/google';
import client from '@/app/common/api';
import { Coordinates } from '@/app/types/maps';
import PageHead from '../PageHead/PageHead';
import AddressAutocompleteField from './AddressAutocompleteField';
import { AddStationContainer, AddStationForm } from './AddEntity.styles';
import { PrimaryButton, SecondaryButton } from '@/app/styled/Buttons';

const AddStation = () => {
  const [points, setPoints] = useState<Coordinates[]>([]);

  const chooseAutoCompleteOption = async (option: GooglePlace, formikProps: FormikProps<TAddStationForm>) => {
    formikProps.setFieldValue('address', option.main_text);
    const response = await client.get('/lookup/coordinates', {
      params: {
        placeId: option.place_id,
      },
    });
    const { lat, lng } = response.data;
    formikProps.setFieldValue('x', lng.toString());
    formikProps.setFieldValue('y', lat.toString());
    setPoints([{ x: lng, y: lat }]);
  };

  const handleFormSubmit = async (values: TAddStationForm, resetForm: () => void) => {
    const response = await client.post('/stations/add', values, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 201) {
      alert('Success!');
      resetForm();
      setPoints([]);
    }
  };

  return (
    <AddStationContainer>
      <PageHead title="New Station" />
      <Formik
        onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
        validationSchema={stationValidationSchema}
        initialValues={addStationInitialValues}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(formikProps) => (
          <AddStationForm onSubmit={formikProps.handleSubmit}>
            <Title className="form-title">New Station</Title>
            <div className="field">
              <FormTextField title="Name" value={formikProps.values.name} onChange={formikProps.handleChange('name')} />
            </div>
            <AddressAutocompleteField
              onChooseOption={(option) => chooseAutoCompleteOption(option, formikProps)}
              textInput={formikProps.values.address}
              setTextInput={formikProps.handleChange('address')}
            />
            <div className="field field--capacity">
              <FormTextField
                title="Capacity"
                value={formikProps.values.capacity}
                onChange={formikProps.handleChange('capacity')}
                error={formikProps.touched.capacity ? formikProps.errors.capacity : ''}
                handleBlur={formikProps.handleBlur('capacity')}
              />
            </div>
            <div className="field field--city">
              <FormTextField
                title="City (optional)"
                value={formikProps.values.city}
                onChange={formikProps.handleChange('city')}
                error={formikProps.touched.city ? formikProps.errors.city : ''}
                handleBlur={formikProps.handleBlur('city')}
              />
            </div>
            <div className="field field--operator">
              <FormTextField
                title="Operator (optional)"
                value={formikProps.values.operator}
                onChange={formikProps.handleChange('operator')}
                error={formikProps.touched.operator ? formikProps.errors.operator : ''}
                handleBlur={formikProps.handleBlur('operator')}
              />
            </div>
            <div className="form-controls">
              <PrimaryButton type="submit">Apply</PrimaryButton>
              {formikProps.dirty && (
                <SecondaryButton type="reset" onClick={formikProps.handleReset}>
                  Reset
                </SecondaryButton>
              )}
            </div>
          </AddStationForm>
        )}
      </Formik>
      <Map points={points} />
    </AddStationContainer>
  );
};

export default AddStation;
