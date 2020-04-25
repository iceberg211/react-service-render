import App from "./app";
import a from "./containers/a";
import b from "./containers/b";

export default [
  {
    path: "/",
    component: App,
    routes: [
      {
        path: "/",
        component: a,
        exact: true,
        key: "home",
      },
      {
        path: "/b",
        component: b,
        exact: true,
        key: "b",
      },
    ],
  },
];
