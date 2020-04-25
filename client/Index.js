import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import { getClientStore } from "./store";
import routes from "./routes";

const store = getClientStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
  );
};

const render = (App) =>
  ReactDOM.hydrate(<App />, document.getElementById("root"));

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app.js", () => {
    const App = require("./app").default;
    render(App);
  });
}

render(App);
