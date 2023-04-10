import styled, { css } from 'styled-components';
import TextField from '../TextField/TextField';

export const FormField = styled(TextField)`
  flex: 1;
`;

export const NumberField = styled(TextField)`
  width: 80px;
`;

export const SFilters = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.appBoxPadding};
  border-right: 4px solid ${({ theme }) => theme.appBackgroundColor};

  .form-section {
    border: none;
    padding: none;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
  }

  .field-header {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .fieldset-title {
    margin-bottom: 12px;
  }

  .field-title {
    font-size: 14px;
    color: ${({ theme }) => theme.blackColor};
  }

  .input-line {
    display: flex;
    align-items: center;

    &__spacer {
      width: 20px;
      margin: 0 8px;
      height: 1px;
      background-color: ${({ theme }) => theme.secondaryColor};
    }

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export const SSortingSwitch = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SSortingOption = styled.button<{ isActive: boolean }>`
  box-sizing: border-box;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.blackColor};
  background: transparent;
  transition: 0.3s;
  margin-right: 8px;
  border: 1px solid ${({ theme }) => theme.secondaryColor};

  ${({ isActive }) =>
    isActive &&
    css`
      border: 1px solid ${({ theme }) => theme.primaryColor};
    `}

  &:hover,
  &:focus {
    outline: none;
    transform: scale(1.05);
  }
`;

export const SStationOption = styled.button<{ isActive: boolean }>`
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

  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 1;
      border-color: ${({ theme }) => theme.primaryColor};
    `}
`;

export const SStationSwitch = styled.div`
  display: flex;
  flex-direction: row;
`;
