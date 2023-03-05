import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import store from "./slices";
import "./index.css";
import socket from "./socket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChatProvider socket={socket}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </ChatProvider>
    </AuthProvider>
  </React.StrictMode>
);
