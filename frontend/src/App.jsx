import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ChatPage, LoginPage, SignupPage, ErrorPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
