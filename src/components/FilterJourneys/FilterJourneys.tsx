import { Subtitle } from '@/app/styled/Typography';
import StationsSwitch from './StationsSwitch';
import { useState } from 'react';
import { FormField, NumberField, SFilters } from './FilterJourneys.styles';
import SortingSwitch from './SortingSwitch';
import { PrimaryButton } from '@/app/styled/Buttons';

const FilterJourneys = () => {
  const [stationKind, setStationKind] = useState('return');

  const handleUpdateStationKind = (value) => setStationKind(value);
  return (
    <SFilters>
      <fieldset className="form-section">
        <div className="field-header">
          <Subtitle>Station name</Subtitle>
          <StationsSwitch value={stationKind} onChangeValue={handleUpdateStationKind} />
        </div>
        <FormField placeholder="Start typing..." />
      </fieldset>
      <fieldset className="form-section">
        <Subtitle className="fieldset-title">Filters</Subtitle>
        <div className="field-header">
          <span className="field-title">Distance, km</span>
        </div>
        <div className="input-line">
          <NumberField placeholder="min" />
          <div className="input-line__spacer" />
          <NumberField placeholder="max" />
        </div>
        <div className="field-header">
          <span className="field-title">Duration, minutes</span>
        </div>
        <div className="input-line">
          <NumberField placeholder="min" />
          <div className="input-line__spacer" />
          <NumberField placeholder="max" />
        </div>
      </fieldset>
      <fieldset className="form-section">
        <Subtitle className="fieldset-title">Sorting</Subtitle>
        <div className="field-header">
          <span className="field-title">Sort by</span>
        </div>
        <div className="input-line">
          <SortingSwitch
            options={[
              { title: 'Distance', value: 'distance' },
              { title: 'Duration', value: 'duration' },
            ]}
          />
        </div>

        <div className="field-header">
          <span className="field-title">Order</span>
        </div>
        <div className="input-line">
          <SortingSwitch
            options={[
              { title: 'Asc', value: 'asc' },
              { title: 'Desc', value: 'desc' },
            ]}
          />
        </div>
      </fieldset>
      <PrimaryButton>Apply</PrimaryButton>
    </SFilters>
  );
};

export default FilterJourneys;
