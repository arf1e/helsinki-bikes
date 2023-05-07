import Map from '../Map';
import PageHead from '../PageHead/PageHead';
import { AddEntityForm, AddJourneyContainer } from './AddEntity.styles';
import { Title } from '@/app/styled/Typography';
import FormTextField from '../FormField';
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
  DEPARTURE_STATION_INPUT,
  FIELD_DEPARTURE_STATION_ID,
  FIELD_RETURN_STATION_ID,
  FORM_STATE,
  FORM_STATE_IDLE,
  FORM_STATE_LOADING,
  RETURN_STATION_INPUT,
  STATIONS_INPUTS,
  STATION_FIELDS,
  TAddJourneyForm,
} from './AddEntity.types';
import { DateTimeInput } from '@/app/styled/DateTimeInput';
import useStatusBar from '@/app/hooks/useStatusBar';
import client from '@/app/common/api';
import stationsAutocompleteErrorsReducer, {
  CLEAR_AUTOCOMPLETE_ERRORS,
  initStationsAutocompleteErrorsState,
  mapStationToErrorActionType,
  stationsAutocompleteErrorsInitialState,
} from './newJourneyAutocompleteErrorsReducer';
import FormErrors from './FormErrors';

const AddJourney = () => {
  const [points, dispatchPoints] = useReducer(coordinatesReducer, stationsPointsInitialState, initStationCoords);
  const [autocompleteErrors, dispatchAutocompleteErrors] = useReducer(
    stationsAutocompleteErrorsReducer,
    stationsAutocompleteErrorsInitialState,
    initStationsAutocompleteErrorsState,
  );
  const [formState, setFormState] = useState<FORM_STATE>(FORM_STATE_IDLE);
  const { notify } = useStatusBar();

  const handleChooseStation = (
    station: StationSuggestion,
    formikProps: FormikProps<TAddJourneyForm>,
    field: STATION_FIELDS,
  ) => {
    dispatchAutocompleteErrors({ type: 'CLEAR_AUTOCOMPLETE_ERRORS', payload: '' });
    formikProps.setFieldValue(field, station.id);
    const { x, y } = station;
    const type = mapStationFieldToType(field);
    dispatchPoints({ type, payload: { x, y } });
  };

  const handleReturnDateInputBlur = (formikProps: FormikProps<TAddJourneyForm>) => {
    const isDurationLongEnough = isJourneyDurationLongEnough(formikProps);
    if (!isDurationLongEnough) {
      if (!formikProps.errors.returnDate) {
        formikProps.setFieldError('returnDate', 'Journey duration should be at least 10 seconds long.');
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
    await client
      .post('/journeys/add', requestData)
      .then((response) => {
        if (response.status === 201) {
          setFormState(FORM_STATE_IDLE);
          notify({ status: 'success', message: 'New journey has been successfully created!' });
          resetForm();
          dispatchPoints({ type: RESET_COORDINATES, payload: { x: '', y: '' } });
          return;
        }
        throw new Error('Unexpected response code. Please check Network tab in your devtools.');
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Failed to reach the server to create a new station.';
        notify({ status: 'error', message });
        setFormState(FORM_STATE_IDLE);
      });
  };

  /**
   * By default formik doesn't handle touched property on date inputs.
   */
  const handleDateChange = (formikProps: FormikProps<TAddJourneyForm>, field: string) => (e: any) => {
    formikProps.setFieldTouched(field, true);
    formikProps.handleChange(field)(e);
  };

  const handleAutocompleteError = (error: string, field: STATIONS_INPUTS) => {
    const type = mapStationToErrorActionType(field);
    dispatchAutocompleteErrors({ type, payload: error });
  };

  const handleFormReset = (e: any, resetHandler: (e: any) => void) => {
    dispatchPoints({ type: RESET_COORDINATES, payload: { x: '', y: '' } });
    dispatchAutocompleteErrors({ type: CLEAR_AUTOCOMPLETE_ERRORS, payload: '' });
    return resetHandler(e);
  };

  return (
    <AddJourneyContainer data-cy="add-journey-form">
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
              value={formikProps.values[DEPARTURE_STATION_INPUT]}
              setValue={formikProps.handleChange(DEPARTURE_STATION_INPUT)}
              fieldTitle="Departure station"
              autocompleteError={autocompleteErrors[DEPARTURE_STATION_INPUT]}
              setAutocompleteError={(error) => handleAutocompleteError(error, DEPARTURE_STATION_INPUT)}
              error={formikProps.touched[DEPARTURE_STATION_INPUT] ? formikProps.errors[DEPARTURE_STATION_INPUT] : ''}
              fieldPlaceholder="Start typing..."
              onBlur={formikProps.handleBlur(DEPARTURE_STATION_INPUT)}
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
                  onBlur={formikProps.handleBlur('departureDate')}
                  error={formikProps.touched.departureDate ? formikProps.errors.departureDate : ''}
                />
                {formikProps.touched.departureDate && (
                  <span className="field-error">{formikProps.errors.departureDate}</span>
                )}
              </label>
            </div>
            <StationsAutocompleteField
              value={formikProps.values.returnStationInput}
              setValue={formikProps.handleChange(RETURN_STATION_INPUT)}
              fieldTitle="Return station"
              fieldPlaceholder="Start typing..."
              autocompleteError={autocompleteErrors[RETURN_STATION_INPUT]}
              error={formikProps.touched[RETURN_STATION_INPUT] ? formikProps.errors[RETURN_STATION_INPUT] : ''}
              setAutocompleteError={(error) => handleAutocompleteError(error, RETURN_STATION_INPUT)}
              onBlur={formikProps.handleBlur(RETURN_STATION_INPUT)}
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
            <FormErrors
              shouldDisplay={formikProps.submitCount > 0}
              errors={[formikProps.errors[FIELD_DEPARTURE_STATION_ID], formikProps.errors[FIELD_RETURN_STATION_ID]]}
            />
            <div className="form-controls">
              <PrimaryButton type="submit" disabled={formState === FORM_STATE_LOADING}>
                Submit
              </PrimaryButton>
              <SecondaryButton
                type="reset"
                disabled={formState === FORM_STATE_LOADING}
                onClick={(e: any) => handleFormReset(e, formikProps.handleReset)}
              >
                Reset
              </SecondaryButton>
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
