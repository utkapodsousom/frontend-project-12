import React, {
  useContext, useState, useEffect, useMemo,
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

export const AuthContext = React.createContext({});
const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ token: '', username: '' });

  useEffect(() => {
    setUser(getuserFromLocalStorage);
  }, []);

  const getHeaders = () => {
    const { token } = user;
    if (token) return { Authorization: `Bearer ${token}` };
    return {};
  };

  const saveUser = (loginToken, loginUsername) => {
    const newUser = { token: loginToken, username: loginUsername };
    setUser(newUser);
    setUserInLocalStorage(newUser);
  };

  const providerValue = useMemo(
    () => ({ user, saveUser, getHeaders }),
    [user, saveUser, getHeaders],
  );

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
}

export default useAuthContext;
