import React from "react";
import ReactDOM from "react-dom";
import App from './root';


const render = (App) =>
  ReactDOM.hydrate(<App />, document.getElementById("root"));

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./root.js", () => {
    const App = require("./root").default;
    render(App);
  });
}

render(App);
