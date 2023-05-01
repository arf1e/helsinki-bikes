import Map from '../Map';
import PageHead from '../PageHead/PageHead';
import { AddEntityForm, AddJourneyContainer } from './AddEntity.styles';
import { Title } from '@/app/styled/Typography';
import FormTextField from '../FomField/FormFIeld';
import { useReducer, useState } from 'react';
import { PrimaryButton, SecondaryButton } from '@/app/styled/Buttons';
import StationsAutocompleteField from './StationAutocompleteField';
import { Formik, FormikProps } from 'formik';
import { addJourneyInitialValues, isJourneyDurationLongEnough, journeyValidationSchema } from './AddEntity.utils';
import { StationSuggestion } from '@/app/types/stations';
import coordinatesReducer, {
  RESET_COORDINATES,
  initStationCoords,
  mapStationFieldToType,
  stationsPointsInitialState,
} from './newJourneyMapReducer';
import {
  FIELD_DEPARTURE_STATION_ID,
  FIELD_RETURN_STATION_ID,
  FORM_STATE,
  FORM_STATE_ERROR,
  FORM_STATE_IDLE,
  FORM_STATE_LOADING,
  STATION_FIELDS,
  TAddJourneyForm,
} from './AddEntity.types';
import { DateTimeInput } from '@/app/styled/DateTimeInput';
import useStatusBar from '@/app/hooks/useStatusBar';
import client from '@/app/common/api';

const AddJourney = () => {
  const [points, dispatch] = useReducer(coordinatesReducer, stationsPointsInitialState, initStationCoords);
  const [formState, setFormState] = useState<FORM_STATE>(FORM_STATE_IDLE);
  const { notify } = useStatusBar();

  const handleChooseStation = (
    station: StationSuggestion,
    formikProps: FormikProps<TAddJourneyForm>,
    field: STATION_FIELDS,
  ) => {
    formikProps.setFieldValue(field, station.id);
    const { x, y } = station;
    const type = mapStationFieldToType(field);
    dispatch({ type, payload: { x, y } });
  };

  const handleReturnDateInputBlur = (formikProps: FormikProps<TAddJourneyForm>) => {
    const isDurationLongEnough = isJourneyDurationLongEnough(formikProps);
    if (!isDurationLongEnough) {
      if (!formikProps.errors.returnDate) {
        formikProps.setFieldError('returnDate', 'Journey duration is too low.');
      }
    } else {
      formikProps.setFieldError('returnDate', undefined);
    }
  };

  const handleFormSubmit = async (values: TAddJourneyForm, resetForm: () => void) => {
    setFormState(FORM_STATE_LOADING);
    notify({ status: 'loading', message: 'Creating journey...' });
    const requestData = {
      departureId: values[FIELD_DEPARTURE_STATION_ID],
      returnId: values[FIELD_RETURN_STATION_ID],
      departureTime: values.departureDate,
      returnTime: values.returnDate,
      distance: values.distance,
    };
    const response = await client.post('/journeys/add', requestData);
    if (response.status === 201) {
      notify({ status: 'success', message: 'New journey has been successfully created!' });
      setFormState(FORM_STATE_IDLE);
      resetForm();
      dispatch({ type: RESET_COORDINATES, payload: { x: 'reset', y: 'reset' } });
      return;
    }
    setFormState(FORM_STATE_ERROR);
    notify({ status: 'error', message: 'Failed to create new journey.' });
  };

  /**
   * By default formik doesn't handle touched property on date inputs.
   */
  const handleDateChange = (formikProps: FormikProps<TAddJourneyForm>, field: string) => (e: any) => {
    formikProps.setFieldTouched(field, true);
    formikProps.handleChange(field)(e);
  };

  return (
    <AddJourneyContainer>
      <PageHead title="New Journey" />
      <Formik
        validationSchema={journeyValidationSchema}
        initialValues={addJourneyInitialValues}
        onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(formikProps) => (
          <AddEntityForm onSubmit={formikProps.handleSubmit} onReset={formikProps.handleReset}>
            <Title className="form-title">New Journey</Title>
            <div className="field">
              <FormTextField
                title="Journey distance, m"
                value={formikProps.values.distance}
                onChange={formikProps.handleChange('distance')}
                placeholder="Positive number (hopefully)"
                error={formikProps.touched.distance ? formikProps.errors.distance : ''}
                handleBlur={formikProps.handleBlur('distance')}
              />
            </div>
            <StationsAutocompleteField
              value={formikProps.values.departureStationInput}
              setValue={formikProps.handleChange('departureStationInput')}
              fieldTitle="Departure station"
              error={formikProps.touched.departureStationInput ? formikProps.errors.departureStationInput : ''}
              fieldPlaceholder="Start typing..."
              onBlur={formikProps.handleBlur('departureStationInput')}
              onChooseOption={(option) => handleChooseStation(option, formikProps, FIELD_DEPARTURE_STATION_ID)}
            />
            <div className="field">
              <label className="containing-label containing-label--date">
                <span className="label-text">Departure date</span>
                <DateTimeInput
                  type="datetime-local"
                  value={formikProps.values.departureDate}
                  step="1"
                  onChange={formikProps.handleChange('departureDate')}
                />
              </label>
            </div>
            <StationsAutocompleteField
              value={formikProps.values.returnStationInput}
              setValue={formikProps.handleChange('returnStationInput')}
              fieldTitle="Return station"
              fieldPlaceholder="Start typing..."
              onChooseOption={(option) => handleChooseStation(option, formikProps, FIELD_RETURN_STATION_ID)}
            />
            <div className="field">
              <label className="containing-label containing-label--date">
                <span className="label-text">Return date</span>
                <DateTimeInput
                  type="datetime-local"
                  min={formikProps.values.departureDate}
                  value={formikProps.values.returnDate}
                  onBlur={() => handleReturnDateInputBlur(formikProps)}
                  error={formikProps.touched.returnDate ? formikProps.errors.returnDate : ''}
                  step="1"
                  onChange={handleDateChange(formikProps, 'returnDate')}
                />
                {formikProps.touched.returnDate && <span className="field-error">{formikProps.errors.returnDate}</span>}
              </label>
            </div>
            <div className="form-controls">
              <PrimaryButton type="submit">Submit</PrimaryButton>
              <SecondaryButton type="reset">Reset</SecondaryButton>
            </div>
          </AddEntityForm>
        )}
      </Formik>
      <Map
        points={[
          { ...points.departure, text: '1' },
          { ...points.return, text: '2' },
        ]}
      />
    </AddJourneyContainer>
  );
};

export default AddJourney;
