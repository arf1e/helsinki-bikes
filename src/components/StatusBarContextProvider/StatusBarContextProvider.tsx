import { STATUS_IDLE, STATUS_TYPES, StatusBarContext } from '@/app/hooks/useStatusBar';
import { ReactNode, useState } from 'react';

const StatusBarContextProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<STATUS_TYPES>(STATUS_IDLE);
  const [message, setMessage] = useState('');
  return (
    <div>
      <StatusBarContext.Provider value={{ status, setStatus, message, setMessage }}>
        {children}
      </StatusBarContext.Provider>
    </div>
  );
};

export default StatusBarContextProvider;
