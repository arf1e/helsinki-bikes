import styled from 'styled-components';

const StationErrorContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  padding: ${({ theme }) => theme.appBoxPadding};
  min-height: ${({ theme }) => theme.minContainerHeight};

  .error-title {
    color: ${({ theme }) => theme.darkGrayColor};
    margin-bottom: 16px;
  }

  .error-message {
    margin-bottom: 12px;
  }

  .error-link {
    text-decoration: none;
    color: ${({ theme }) => theme.backgroundColor};
    transition: 0.3s;
    padding: 12px 24px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.primaryColor};

    &:hover {
      background-color: ${({ theme }) => theme.darkGrayColor};
    }
  }
`;

export default StationErrorContainer;
