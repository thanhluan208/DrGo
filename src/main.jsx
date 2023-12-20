import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppThemeProvider from "./providers/AppThemeProvider.jsx";
import AuthenticationProvider from "./providers/AuthenticationProvider.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthenticationProvider>
    <AppThemeProvider>
      <App />
      <ToastContainer />
    </AppThemeProvider>
  </AuthenticationProvider>
);
