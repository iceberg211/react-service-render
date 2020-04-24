import React from "react";
import { renderRoutes } from "react-router-config";

const App = (props) => {
  return (
    <div>
      <header>我是标题</header>
      {renderRoutes(props.route.routes)}
    </div>
  );
};

export default App;
