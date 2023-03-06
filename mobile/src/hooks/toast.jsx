import React, { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ToastContainer from '../components/ToastContainer/ToastContainer';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState(undefined);

  const addToast = useCallback(({ type, title, description }) => {
    setMessage({ type, title, description });
  }, []);

  const removeToast = useCallback(() => setMessage(), []);

  const toast = useCallback(
    ({ type, title, description }) => addToast({ type, title, description }),
    [addToast]
  );
  toast.exception = useCallback(
    (exception) => {
      addToast({
        type: 'error',
        title: t(
          exception && exception.message
            ? exception.message
            : 'aw-snap-something-went-wrong'
        ),
      });
    },
    [addToast, t]
  );
  toast.error = useCallback(
    ({ title, description }) => addToast({ type: 'error', title, description }),
    [addToast]
  );
  toast.success = useCallback(
    ({ title, description }) =>
      addToast({ type: 'success', title, description }),
    [addToast]
  );
  toast.info = useCallback(
    ({ title, description }) => addToast({ type: 'info', title, description }),
    [addToast]
  );
  return (
    <ToastContext.Provider value={{ addToast, removeToast, toast }}>
      {children}
      <ToastContainer message={message} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

ToastProvider.propTypes = {
  children: PropTypes.node,
};

ToastProvider.defaultProps = {
  children: [],
};

export { ToastProvider, useToast };
