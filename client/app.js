import { hot } from "react-hot-loader/root";
import React from "react";
import { renderRoutes } from "react-router-config";

const App = (props) => {
  return (
    <div className="box">
      <header>我是标题哈哈111</header>
      <header>我是标题哈哈111</header>
      {renderRoutes(props.route.routes)}
      <header>我是标题哈哈111</header>
    </div>
  );
};

export default hot(App);
