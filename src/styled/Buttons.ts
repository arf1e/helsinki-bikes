import styled from 'styled-components';

export const PrimaryButton = styled.button`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-vertical: 12px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.backgroundColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
