import styled from 'styled-components';

export const PaginationButton = styled.button`
  min-width: 40px;
  height: 40px;
  background: transparent;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.primaryColor};
  transition: 0.3s;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  .chevron {
    transition: 0.3s;
    path {
      transition: 0.3s;
      stroke: ${({ theme }) => theme.primaryColor};
    }
    &--next {
      transform: rotate(180deg);
    }
  }

  &.current {
    border-color: ${({ theme }) => theme.blackColor};
    color: ${({ theme }) => theme.blackColor};
  }

  &:not(:first-child) {
    margin-left: 8px;
  }

  &:not(.current) {
    cursor: pointer;
  }

  &:not(.current):hover {
    background: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.backgroundColor};

    path {
      stroke: ${({ theme }) => theme.backgroundColor};
    }
  }

  &:disabled {
    border-color: ${({ theme }) => theme.grayColor};
    color: ${({ theme }) => theme.grayColor};
    cursor: default;

    path {
      stroke: ${({ theme }) => theme.grayColor};
    }

    &:hover {
      background: ${({ theme }) => theme.backgroundColor};
      color: ${({ theme }) => theme.grayColor};
      path {
        stroke: ${({ theme }) => theme.grayColor};
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;
