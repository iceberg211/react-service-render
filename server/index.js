const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
const noFavicon = require("express-no-favicons");

const clientConfig = require("../webpack/client.dev");
const serverConfig = require("../webpack/server.dev");

const { publicPath } = clientConfig.output;

let isBuilt = false;
const app = express();

app.use(noFavicon());
app.use(express.static("public"));

const DEV = true;

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true;
    console.log("BUILD COMPLETE -- Listening @ http://localhost:3000".magenta);
  });


if (dev) {
  const compiler = webpack([clientConfig, serverConfig]);
  // 客户端webpackCompiler
  const clientCompiler = compiler.compilers[0];
  const options = { publicPath, stats: { colors: true } };

  // 使用中间件的形式去加载。
  const devMiddleware = webpackDevMiddleware(compiler, options);

  app.use(devMiddleware);

  // 配置客户端热更新
  app.use(webpackHotMiddleware(clientCompiler));

  // 配置服务端热更新
  app.use(webpackHotServerMiddleware(compiler));

  devMiddleware.waitUntilValid(done);
} else {
  console.log('todo')
}

