import React, {
  useContext, useState, useEffect, useMemo, useCallback,
} from 'react';

const getuserFromLocalStorage = () => {
  const token = localStorage.getItem('userToken');
  const username = localStorage.getItem('username');
  return { token, username };
};

const setUserInLocalStorage = (user) => {
  const { token, username } = user;
  localStorage.setItem('userToken', token);
  localStorage.setItem('username', username);
};

const removeUserInLocalStorage = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('username');
};

export const AuthContext = React.createContext({});
const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ token: null, username: null });

  useEffect(() => {
    setUserData(getuserFromLocalStorage);
  }, []);

  const getToken = useCallback(() => {
    const { token } = userData;
    if (token) return token;
    return {};
  }, [userData]);

  const saveUser = useCallback((loginToken, loginUsername) => {
    const newUser = { token: loginToken, username: loginUsername };
    setUserData(newUser);
    setUserInLocalStorage(newUser);
  }, [userData]);

  const logout = () => {
    setUserData({ token: null, username: null });
    removeUserInLocalStorage();
  };

  const providerValue = useMemo(
    () => ({
      userData, saveUser, getToken, logout,
    }),
    [userData, saveUser, getToken],
  );

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default useAuthContext;
