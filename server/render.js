import React from "react";
import { renderToString } from "react-dom/server";
import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import renderApp from "../client/server";
import { getStore } from "../client/store";
import { matchRoutes } from "react-router-config";
import routes from "../client/routes";

const createMakeUp = (html, style, js) => `
  <!doctype html>
    <html>
    <head>
      <title>App</title>
      ${style.toString()}
    </head>
    <body>
    <div id="root">${html}</div>
    ${js}
    </body>
</html>
  `;

export default function serverRenderer({ clientStats }) {
  return (req, res) => {
    const store = getStore(req);

    const chunkNames = flushChunkNames();

    const { js, styles, scripts, stylesheets } = flushChunks(clientStats, {
      chunkNames,
    });


    // 根据路由的路径，来往store里面加数据
    const matchedRoutes = matchRoutes(routes, req.path);
    // 让matchRoutes里面所有的组件，对应的loadData方法执行一次
    const promises = [];

    matchedRoutes.forEach((item) => {
      if (item.route.loadData) {
        const promise = new Promise((resolve, reject) => {
          item.route.loadData(store).then(resolve).catch(resolve);
        });
        promises.push(promise);
      }
    });

    Promise.all(promises).then(() => {
      const context = { css: [] };
      const App = renderApp(req, store, {});
      const html = createMakeUp(renderToString(App), styles, js);

      if (context.action === "REPLACE") {
        res.redirect(301, context.url);
      } else if (context.NOT_FOUND) {
        res.status(404);
        res.send(html);
      } else {
        res.send(html);
      }
    });
  };
}
