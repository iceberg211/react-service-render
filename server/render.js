import React from "react";
import { renderToString } from "react-dom/server";
import { flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import renderApp from "../client/server";
import { getStore } from "../client/store";
import { matchRoutes } from "react-router-config";
import { Helmet } from 'react-helmet';
import routes from "../client/routes";

const createMakeUp = (html, style, js, helmet, store) => `
  <!doctype html>
    <html>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${style}
    </head>
    <body>
    <div id="root">${html}</div>
    <script>
      window.context = {
        state: ${JSON.stringify(store.getState())}
      }
    </script>
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
      const fn = item.route.component.getInitialProps;
      if (fn) {
        const promise = new Promise((resolve, reject) => {
          fn(store, req, res).then(resolve).catch(resolve);
        });
        promises.push(promise);
      }
    });

    Promise.all(promises).then(() => {
      const context = { css: [] };

      // 通过server入口文件那个到App组件
      const App = renderApp(req, store, {});

      //拿到helmet对象，然后在html字符串中引入
      const helmet = Helmet.renderStatic();
      const html = createMakeUp(renderToString(App), styles, js, helmet, store);
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
