import { SStationOption, SStationSwitch } from './FilterJourneys.styles';

type SwitchValue = {
  title: string;
  value: string;
};

type StationsSwitchProps = {
  value?: string;
  onChangeValue: (value: string) => void;
  values: SwitchValue[];
};

const StationsSwitch = ({ value, onChangeValue, values }: StationsSwitchProps) => {
  return (
    <SStationSwitch>
      {values.map((option) => (
        <SStationOption
          type="button"
          key={option.value}
          isActive={value === option.value}
          onClick={() => onChangeValue(option.value)}
        >
          {option.title}
        </SStationOption>
      ))}
    </SStationSwitch>
  );
};

export default StationsSwitch;
