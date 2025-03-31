import React from "react";
import ReactDOM from "react-dom/client";
import { LoginProvider } from "./hooks/useLogin";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoginProvider>
      <App />
    </LoginProvider>
  </React.StrictMode>,
);
