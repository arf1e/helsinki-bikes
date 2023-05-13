import styled, { css } from 'styled-components';

const SInput = styled.input<{ isInvalid?: boolean }>`
  height: 40px;
  border: 1px solid ${({ theme }) => theme.secondaryColor};
  transition: 0.3s;
  border-radius: 4px;
  padding: 12px 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.blackColor};

  ${({ isInvalid }) =>
    isInvalid &&
    css`
      border-color: ${({ theme }) => theme.errorColor};
    `}

  &:placeholder {
    color: ${({ theme }) => theme.grayColor};
  }

  &:hover,
  &:active,
  &:focus {
    outline: none;
    border-color: ${({ theme, isInvalid }) => (isInvalid ? theme.errorColor : theme.primaryColor)};
  }
`;

export default SInput;
