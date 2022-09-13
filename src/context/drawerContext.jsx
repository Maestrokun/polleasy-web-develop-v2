import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const DrawerContext = createContext(null);

function DrawerContextProvider({ children }) {
  const [state, setState] = useState({
    drawerName: '',
    data: null,
  });

  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [state]
  );
  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}

export default DrawerContextProvider;

DrawerContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
