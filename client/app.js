import { hot } from "react-hot-loader/root";
import React from "react";
import { renderRoutes } from "react-router-config";

const App = (props) => {
  return (
    <div className="box">
      <header>header</header>
      {renderRoutes(props.route.routes)}
      <header onClick={() => console.log("console")}>header</header>
    </div>
  );
};

export default hot(App);
