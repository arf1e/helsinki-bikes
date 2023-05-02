import { SSortingOption, SSortingSwitch } from './FilterJourneys.styles';

type SwitchOption = {
  title: string;
  value: string;
};

type Props = {
  options: SwitchOption[];
  value?: string;
  handleChange: (value: string) => void;
};

const SortingSwitch = ({ options, value, handleChange }: Props) => {
  return (
    <SSortingSwitch>
      {options.map((option) => (
        <SSortingOption
          isActive={value === option.value}
          onClick={() => handleChange(option.value)}
          type="button"
          key={option.value}
          data-cy={`sorting-${option.value}`}
        >
          {option.title}
        </SSortingOption>
      ))}
    </SSortingSwitch>
  );
};

export default SortingSwitch;
