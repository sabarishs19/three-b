import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <App />
    <div className="overlay">
      <a className="left" href="">
        S
      </a>
      <a className="right" href="">
        csb
      </a>

      <h2>SPACESURF</h2>
    </div>
  </>,
  document.getElementsByTagName("root")
);
