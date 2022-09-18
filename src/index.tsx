import React from "react";
import ReactDOM from "react-dom";
import { Routing } from "./router";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.render(
  // <React.StrictMode>
  <>
    <CssBaseline />
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </>,
  // </React.StrictMode>
  document.getElementById("root")
);

reportWebVitals();
