import styled from 'styled-components';

export const AddStationContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: space-between;
`;

export const AddStationForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.appBoxPadding};

  .form-title {
    margin-bottom: 32px;
  }

  .form-controls {
    display: flex;
    flex-direction: row;
    width: 240px;
    justify-content: space-between;

    button[type='submit'] {
      flex: 3;
    }

    button[type='reset'] {
      flex: 2;
      margin-left: 16px;
    }
  }

  .field {
    width: 240px;
    margin-bottom: 16px;
    input {
      width: 100%;
    }
  }

  .field--capacity {
    width: 80px;
  }

  .field--autocomplete {
    position: relative;

    .suggestions {
      position: absolute;
      display: flex;
      width: 100%;
      flex-direction: column;
      top: 100%;
      .suggestions__suggestion {
        border: none;
        display: flex;
        cursor: pointer;
        flex-direction: column;
        padding: 8px;
        background: ${({ theme }) => theme.backgroundColor};
        width: 100%;
        align-self: stretch;
        transition: 0.3s;
        border-bottom: 1px solid ${({ theme }) => theme.secondaryColor};

        .suggestion-title {
          transition: inherit;
          color: ${({ theme }) => theme.blackColor};
        }

        .suggestion-occupation {
          transition: inherit;
          color: ${({ theme }) => theme.darkGrayColor};
        }

        &:hover {
          padding-left: 12px;
          border-bottom: 1px solid ${({ theme }) => theme.primaryColor};
          background-color: ${({ theme }) => theme.primaryColor};
          color: ${({ theme }) => theme.backgroundColor};

          .suggestion-title {
            color: ${({ theme }) => theme.backgroundColor};
          }

          .suggestion-occupation {
            color: ${({ theme }) => theme.backgroundColor};
          }
        }
      }
    }
  }
`;
