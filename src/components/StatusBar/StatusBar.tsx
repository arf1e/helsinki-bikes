import useStatusBar, { STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS, STATUS_TYPES } from '@/app/hooks/useStatusBar';
import styled, { css } from 'styled-components';
import LoadingIcon from '@/app/assets/svg/loading.svg';

const StatusBarContainer = styled.div<{ status: STATUS_TYPES }>`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loaderAppear {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  height: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.backgorundColor};
  border-top-left-radius: ${({ theme }) => theme.appBoxPadding};
  border-top-right-radius: ${({ theme }) => theme.appBoxPadding};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  color: ${({ theme }) => theme.blackColor};
  font-size: 14px;
  cursor: pointer;

  .message {
    opacity: 0;
    transition: 0.3s;
    transition-delay: 0.2s;
    transition-property: opacity;
  }

  ${({ status }) =>
    status === STATUS_LOADING &&
    css`
      height: 20px;
      background-color: ${({ theme }) => theme.grayColor};
      .message {
        opacity: 1;
      }

      .loading-icon {
        margin-right: 8px;
        animation: loaderAppear 0.3s, spin 1s linear infinite;
        path {
          fill: ${({ theme }) => theme.blackColor};
        }
      }
    `}

  ${({ status }) =>
    status === STATUS_SUCCESS &&
    css`
      height: 20px;
      background-color: ${({ theme }) => theme.successColor};
      .message {
        opacity: 1;
      }
    `};

  ${({ status }) =>
    status === STATUS_ERROR &&
    css`
      height: 20px;
      color: ${({ theme }) => theme.backgroundColor};
      background-color: ${({ theme }) => theme.errorColor};
      .message {
        opacity: 1;
      }
    `}
`;

const StatusBar = () => {
  const { status, message, closeStatusBar } = useStatusBar();
  return (
    <StatusBarContainer onClick={closeStatusBar} status={status}>
      {status === STATUS_LOADING && <LoadingIcon className="loading-icon" width={14} height={14} viewBox="0 0 20 20" />}
      <span className="message">{message}</span>
    </StatusBarContainer>
  );
};

export default StatusBar;
