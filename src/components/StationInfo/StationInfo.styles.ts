import styled from 'styled-components';

export const StationInfoContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.appBoxPadding};
`;

export const StationHeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 32px;

  .navigation-link {
    padding: 8px 0;
    margin-bottom: 0;
    text-decoration: none;
    color: ${({ theme }) => theme.primaryColor};
    transition: 0.3s;

    &:hover {
      color: ${({ theme }) => theme.darkGrayColor};
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .station-title {
    margin-bottom: 4px;
  }

  .station-address {
    font-size: 14px;
    color: ${({ theme }) => theme.darkGrayColor};
  }
`;

export const StationJourneysContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .journeys-counters {
    list-style: none;
    display: flex;
    justify-content: space-between;
  }

  .journeys-counter {
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    &:first-child {
      margin-right: 12px;
    }

    &__number {
      font-size: 48px;
      line-height: 48px;
      font-weight: 500;
      color: ${({ theme }) => theme.blackColor};
      margin-right: 8px;
    }

    &__description {
      font-size: 14px;
      color: ${({ theme }) => theme.darkGrayColor};
    }
  }
`;

export const StationTopStationsContainer = styled.div`
  display: flex;
  flex-direction: column;

  .top-stations-tables {
    margin-top: 12px;
    list-style: none;
    display: flex;
    justify-content: space-between;
    border-radius: 4px;

    &__table-description {
      font-size: 14px;
      margin-top: 8px;
      color: ${({ theme }) => theme.darkGrayColor};
      max-width: 180px;
    }
  }

  .top-stations-table {
    border: 1px solid ${({ theme }) => theme.grayColor};
    border-radius: 4px;
    width: 250px;

    &__head-cell {
      color: ${({ theme }) => theme.backgroundColor};
      font-weight: 500;
      font-size: 14px;
      padding: 4px 12px;
      background-color: ${({ theme }) => theme.darkGrayColor};
    }

    &__station-row:not(:last-child) .top-stations-table__station-cell {
      border-bottom: 1px solid ${({ theme }) => theme.grayColor};
    }

    &__station-row {
      transition: 0.3s;

      &:hover .top-stations-table__station-cell {
        background-color: ${({ theme }) => theme.primaryColor};
        color: ${({ theme }) => theme.backgroundColor};
      }
    }

    &__station-cell {
      padding: 4px 12px;
      font-size: 14px;
      transition: 0.3s;
    }
  }
`;
