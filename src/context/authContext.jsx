import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useProvideAuth } from 'hooks/useAuth';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const { user, signIn, signOut, userObj } = useProvideAuth();

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      userObj,
    }),
    [user, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
