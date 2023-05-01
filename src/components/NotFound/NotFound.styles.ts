import styled from 'styled-components';

const NotFoundContainer = styled.section`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: ${({ theme }) => theme.minContainerHeight};
  padding: ${({ theme }) => theme.appBoxPadding};

  .code {
    font-size: 212px;
    line-height: 212px;
    color: ${({ theme }) => theme.primaryColor};
    margin-bottom: 16px;
  }

  .heading {
    font-size: 32px;
    color: ${({ theme }) => theme.darkGrayColor};
    margin-bottom: 12px;
  }

  .description {
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.darkGrayColor};
    width: 450px;
    text-align: center;
    margin-bottom: 24px;
  }

  .redirect {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.primaryColor};
    padding: 12px 24px;
    color: ${({ theme }) => theme.backgroundColor};
    transition: 0.3s;

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.darkGrayColor};
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

export default NotFoundContainer;
