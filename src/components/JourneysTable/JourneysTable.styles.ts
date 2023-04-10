import styled from 'styled-components';

export const STable = styled.table`
  border-spacing: 0;
  thead {
    font-size: 14px;

    th:first-child {
      padding-left: ${({ theme }) => theme.appBoxPadding};
    }

    th {
      color: ${({ theme }) => theme.blackColor};
      font-weight: 500;
      padding-bottom: 12px;
    }
  }

  tr {
    text-align: left;
  }

  .departure,
  .return {
    width: 30%;
    overflow-y: clip;
  }

  .journey-row {
    td:first-child {
      padding-left: ${({ theme }) => theme.appBoxPadding};
    }
    td {
      transition: 0.15s;
      font-size: 14px;
      padding: 10px 0;
      color: ${({ theme }) => theme.darkGrayColor};
      border-bottom: 1px solid ${({ theme }) => theme.secondaryColor};
    }

    &:hover {
      td {
        background-color: ${({ theme }) => theme.primaryColor};
        color: ${({ theme }) => theme.backgroundColor};
      }
    }
  }
`;
