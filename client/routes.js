import React from 'react';
import Loadable from 'react-loadable';
import App from "./app";
import a from "./containers/a";

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
        component: Loadable({
          loader: () => import('./containers/b'),
          loading: () => <span>loading</span>,
        }),
        exact: true,
        key: "b",
      },
    ],
  },
];
