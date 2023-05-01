import useStatusBar, { STATUS_LOADING } from '@/app/hooks/useStatusBar';
import LoadingIcon from '@/app/assets/svg/loading.svg';
import StatusBarContainer from './StatusBar.styles';

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
