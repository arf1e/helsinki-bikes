import styled from 'styled-components';
import { SSortingOption, SSortingSwitch } from './FilterJourneys.styles';

type SwitchOption = {
  title: string;
  value: string;
};

type Props = {
  options: SwitchOption[];
  value?: string;
};

const SortingSwitch = ({ options, value }: Props) => {
  return (
    <SSortingSwitch>
      {options.map((option) => (
        <SSortingOption key={option.value}>{option.title}</SSortingOption>
      ))}
    </SSortingSwitch>
  );
};

export default SortingSwitch;
