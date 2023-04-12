import styled from 'styled-components';

export const PrimaryButton = styled.button`
  height: 40px;
  min-width: 40px;
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
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.darkGrayColor};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 1px solid ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.primaryColor};

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.darkGrayColor};
    border-color: ${({ theme }) => theme.darkGrayColor};
  }
`;
