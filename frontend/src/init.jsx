import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import store from './slices';
import './index.css';
import initI18n from './i18n/i18n';
import initSocket from './socket';

const init = () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: 'testenv',
  };

  const i18n = initI18n();
  const socket = initSocket();
  const root = ReactDOM.createRoot(document.getElementById('root'));

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  root.render(
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <ChatProvider socket={socket}>
              <ReduxProvider store={store}>
                <I18nextProvider i18n={i18n}>
                  <App />
                </I18nextProvider>
              </ReduxProvider>
            </ChatProvider>
          </AuthProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>,
  );
};

export default init;
