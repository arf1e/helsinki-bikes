import styled, { css } from 'styled-components';

const SOption = styled.button<{ isActive: boolean }>`
  box-shadow: none;
  font-size: 12px;
  color: ${({ theme }) => theme.blackColor};
  opacity: 0.6;
  text-decoration: none;
  padding-bottom: 4px;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: 0.3s;

  &:not(:last-child) {
    margin-right: 8px;
  }

  &:active {
    transform: scale(0.98);
  }

  &:hover,
  &:focus {
    outline: none;
    opacity: 1;
    color: ${({ theme }) => theme.primaryColor};
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      opacity: 1;
      border-color: ${({ theme }) => theme.primaryColor};
    `}
`;

const SSwitch = styled.div`
  display: flex;
  flex-direction: row;
`;

const SwitchElement = ({ value, isActive }) => {};

const StationsSwitch = ({ value, onChangeValue }) => {
  return (
    <SSwitch>
      <SOption tabIndex={0} isActive={value === 'departure'} onClick={() => onChangeValue('departure')}>
        Departure
      </SOption>
      <SOption tabIndex={0} isActive={value === 'return'} onClick={() => onChangeValue('return')}>
        Return
      </SOption>
    </SSwitch>
  );
};

export default StationsSwitch;
