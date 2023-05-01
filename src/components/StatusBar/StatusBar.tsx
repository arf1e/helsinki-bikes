import useStatusBar, { STATUS_ERROR, STATUS_LOADING, STATUS_SUCCESS, STATUS_TYPES } from '@/app/hooks/useStatusBar';
import styled, { css } from 'styled-components';

const StatusBarContainer = styled.div<{ status: STATUS_TYPES }>`
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
      <span className="message">{message}</span>
    </StatusBarContainer>
  );
};

export default StatusBar;
