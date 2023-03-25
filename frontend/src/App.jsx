import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './components';
import {
  ChatPage, LoginPage, SignupPage, ErrorPage,
} from './pages';
import PrivateRoute from './routes/PrivateRoute';
import routes from './routes/routes';

const App = () => (
  <BrowserRouter>
    <div className="flex flex-col h-full relative">
      <Header />
      <Routes>
        <Route
          path={routes.pages.chat()}
          element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
            )}
        />
        <Route
          path={routes.pages.signup()}
          element={<SignupPage />}
        />
        <Route
          path={routes.pages.login()}
          element={<LoginPage />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
      <ToastContainer />
    </div>
  </BrowserRouter>
);

export default App;
