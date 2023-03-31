import React, {
  useContext, useState, useMemo, useCallback,
} from 'react';

const generateEmptyUser = () => ({
  username: '',
  token: '',
});

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

export const AuthContext = React.createContext({});

const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(getuserFromLocalStorage());

  const getToken = useCallback(() => {
    const { token } = userData;
    if (token) return token;
    return {};
  }, [userData]);

  const login = (data) => {
    setUserData(data);
    setUserInLocalStorage(data);
  };

  const logout = () => {
    const emptyUser = generateEmptyUser();
    setUserData(emptyUser);
    setUserInLocalStorage(emptyUser);
  };

  const providerValue = useMemo(
    () => ({
      userData, getToken, logout, login,
    }),
    [userData, getToken],
  );

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default useAuthContext;
