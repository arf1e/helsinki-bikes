import styled, { css } from 'styled-components';

export const DateTimeInput = styled.input<{ error?: string }>`
  color: ${({ theme }) => theme.darkGrayColor};
  border: 1px solid ${({ theme }) => theme.secondaryColor};
  border-radius: 4px;
  cursor: text;
  height: 40px;
  padding: 8px;
  font-family: inherit;
  font-size: 14px;
  transition: 0.3s;
  margin: 0;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.blackColor};
    outline: none;
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }

  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${({ theme }) => theme.errorColor};
    `}
`;
