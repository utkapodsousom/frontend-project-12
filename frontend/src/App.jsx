import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './components';
import {
  ChatPage, LoginPage, SignupPage, ErrorPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<ChatPage />}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
