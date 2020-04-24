import React from "react";
import App from "./app";
import Home from "./containers/a";
import Translation from "./containers/b";

// 当我加载显示HOME组件之前，我希望调用Home.loadData方法，提前获取到必要的异步数据
// 然后再做服务器端渲染，把页面返回给用户
export default [
  {
    path: "/",
    component: App,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
        key: "home",
      },
      {
        path: "/b",
        component: Translation,
        exact: true,
        key: "translation",
      },
    ],
  },
];
