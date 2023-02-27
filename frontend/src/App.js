import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Main from "./pages/Main";
import Error from "./pages/Error";
import Login from "./pages/Login";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const login = async (values) => {
    try {
      const response = await axios.post("/api/v1/login", values);
      const { token: loginToken, username } = response.data;
      setToken(loginToken);
      localStorage.setItem("token", loginToken);
      localStorage.setItem("login", username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
