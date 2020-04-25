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

const compiler = webpack([clientConfig, serverConfig]);
const clientCompiler = compiler.compilers[0];
const options = { publicPath, stats: { colors: true } };
const devMiddleware = webpackDevMiddleware(compiler, options);

app.use(devMiddleware);
app.use(webpackHotMiddleware(clientCompiler));
app.use(webpackHotServerMiddleware(compiler));

devMiddleware.waitUntilValid(done);
