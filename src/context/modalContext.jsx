import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ModalContext = createContext(null);

function ModalContextProvider({ children }) {
  const [state, setState] = useState({
    modalName: '',
    message: '',
    redirect: '',
    id: null,
    data: null,
    redirectTime: 4000,
  });

  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [state]
  );
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export default ModalContextProvider;

ModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
