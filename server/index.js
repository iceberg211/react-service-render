const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
const noFavicon = require("express-no-favicons");
const clientConfigProd = require('../webpack/client.prod')
const serverConfigProd = require('../webpack/server.prod')
const clientConfig = require("../webpack/client.dev");
const serverConfig = require("../webpack/server.dev");

const { publicPath } = clientConfig.output;
const outputPath = clientConfig.output.path;

let isBuilt = false;
const app = express();

app.use(noFavicon());

const DEV = process.env.NODE_ENV === 'development'

const done = () =>
  !isBuilt &&
  app.listen(4200, () => {
    isBuilt = true;
    console.log("BUILD COMPLETE -- Listening @ http://localhost:4200");
  });


if (DEV) {
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
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const serverRender = require('../buildServer/main.js').default

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))

    done()
  })
}


