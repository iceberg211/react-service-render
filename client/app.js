import React from "react";
import { hot } from "react-hot-loader/root";
import { renderRoutes } from "react-router-config";

const App = (props) => {
  return (
    <div>
      <header>我是标题哈哈</header>
      {renderRoutes(props.route.routes)}
    </div>
  );
};


export default hot(App);
