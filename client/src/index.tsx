import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./store/StoreContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <StoreProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StoreProvider>
  </Router>
);

reportWebVitals();
