import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./global.css";

import App from "./App.jsx";
import { store } from "./store/store";
import "./index.css";

// ✅ ADICIONADO (sem interferir em nada)
import emailjs from "@emailjs/browser";
emailjs.init("FFd8Nz0lLoCGsSofI");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
