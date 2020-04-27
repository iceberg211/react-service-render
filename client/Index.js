import React from "react";
import ReactDOM from "react-dom";
import App from './client';

const root = document.getElementById("root")

const render = (App) =>
  ReactDOM.hydrate(<App />, root);

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./client.js", () => {
    const App = require("./client").default;
    render(App);
  });
}

render(App);
