import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppThemeProvider from "./providers/AppThemeProvider.jsx";
import AuthenticationProvider from "./providers/AuthenticationProvider.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthenticationProvider>
    <I18nextProvider i18n={i18n}>
      <AppThemeProvider>
        <App />
        <ToastContainer />
      </AppThemeProvider>
    </I18nextProvider>
  </AuthenticationProvider>
);
