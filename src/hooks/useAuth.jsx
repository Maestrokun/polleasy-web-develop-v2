import { useState, useContext, useEffect } from 'react';
import { useMutation } from 'react-query';

import { AuthContext } from 'context/authContext';

import Auth from 'utils/Auth';
import authService from 'pages/Auth/services';

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [userObj, setUserObj] = useState(null);
  const mutate = useMutation(authService.login);

  useEffect(() => {
    const isAuthenticated = Auth.isAuthenticated();
    if (isAuthenticated) {
      const decodedUser = Auth.getDecodedJwt();

      setUser(decodedUser.role);
      setUserObj(decodedUser);
    }
  }, [user]);
  const signIn = async (payload) => {
    const { data } = await mutate.mutateAsync(payload);
    if (data) {
      const decodedUser = await Auth.getDecodedJwt(data?.access);
      setUser(decodedUser.role);
      setUserObj(decodedUser);
    }
    return data;
  };

  const signOut = () => {
    Auth.removeToken('admin');
    setUserObj(null);
    return setUser(false);
  };

  return { user, signIn, signOut, userObj };
};

const useAuth = () => {
  const auth = useContext(AuthContext);
  return { auth };
};

export default useAuth;
