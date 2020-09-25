import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import routes from "./routes";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'

// 潜在的坑，上面的store是一个单例，当这个单例导出去后，所有的用户用的是同一份store，这是不应该的。必须倒出一份
const creatApp = (req, store, context) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StaticRouter location={req.path} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default creatApp;
