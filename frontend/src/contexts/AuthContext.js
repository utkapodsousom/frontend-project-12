import React, { useContext, useState, useEffect } from "react";

const getTokenFromLocalStorage = () => localStorage.getItem("userToken");
const setTokeInLocalStorage = (token) =>
  localStorage.setItem("userToken", token);

export const AuthContext = React.createContext({});
const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(getTokenFromLocalStorage);
  }, []);

  const getHeaders = () => {
    if (token) return { Authorization: `Bearer ${token}` };
    return {};
  };

  const saveToken = (loginToken) => {
    setToken(loginToken);
    setTokeInLocalStorage(loginToken);
  }

  return (
    <AuthContext.Provider value={{ token, saveToken, getHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
