import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./styles/base.scss";
import MainProvider from "./providers/MainProvider";
import App from "./App";

function MainContainer() {
  return (
    <MainProvider>
      <App />
    </MainProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MainContainer />, rootElement);
