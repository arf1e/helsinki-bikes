import { Context, Dispatch, SetStateAction, useContext, createContext, useEffect, useCallback } from 'react';

export const STATUS_IDLE = 'IDLE';
export const STATUS_LOADING = 'LOADING';
export const STATUS_SUCCESS = 'SUCCESS';
export const STATUS_ERROR = 'ERROR';

const MESSAGE_LOADING = 'loading';
const MESSAGE_SUCCESS = 'success';
const MESSAGE_ERROR = 'error';

type MESSAGE_TYPES = typeof MESSAGE_LOADING | typeof MESSAGE_SUCCESS | typeof MESSAGE_ERROR;

export type STATUS_TYPES = typeof STATUS_IDLE | typeof STATUS_LOADING | typeof STATUS_SUCCESS | typeof STATUS_ERROR;

type TnotifyArguments = {
  status: MESSAGE_TYPES;
  message?: string;
};

export const StatusBarContext = createContext<{
  status: STATUS_TYPES;
  setStatus: Dispatch<SetStateAction<STATUS_TYPES>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}>({ status: STATUS_IDLE, setStatus: () => {}, message: '', setMessage: () => {} });

/**
 * Custom hook for managing and displaying a status bar.
 * @returns {Object} An object containing current message and status values, and functions to manage the current state - notify and closeStatusBar.
 */
export default function useStatusBar() {
  const { status, setStatus, message, setMessage } = useContext(StatusBarContext);

  const showSuccessMessage = useCallback(
    (message: string = 'Success!') => {
      setMessage(message);
      setStatus(STATUS_SUCCESS);
    },
    [setMessage, setStatus],
  );

  const showLoadingMessage = useCallback(
    (message: string = 'Loading...') => {
      setMessage(message);
      setStatus(STATUS_LOADING);
    },
    [setMessage, setStatus],
  );

  const showErrorMessage = useCallback(
    (error: string = 'Error occured.') => {
      setMessage(error);
      setStatus(STATUS_ERROR);
    },
    [setMessage, setStatus],
  );

  const closeStatusBar = useCallback(() => {
    setStatus(STATUS_IDLE);
    setMessage('');
  }, [setStatus, setMessage]);

  useEffect(() => {
    if (status !== STATUS_IDLE && status !== STATUS_LOADING) {
      const timer = setTimeout(() => {
        closeStatusBar();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [status, closeStatusBar]);

  const notify = useCallback(
    ({ status, message }: TnotifyArguments) => {
      const statusMapper = {
        [MESSAGE_LOADING]: showLoadingMessage,
        [MESSAGE_ERROR]: showErrorMessage,
        [MESSAGE_SUCCESS]: showSuccessMessage,
      };

      const notifyFunction = statusMapper[status];
      notifyFunction(message);
    },
    [showErrorMessage, showLoadingMessage, showSuccessMessage],
  );

  return {
    status,
    message,
    notify,
    closeStatusBar,
  };
}
