import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StoreContext } from "storeon/react";
import { store } from "./store/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);
