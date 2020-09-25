import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { hot } from 'react-hot-loader/root'
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { ThemeProvider } from '@material-ui/core/styles';
import { getClientStore } from "./store";
import routes from "./routes";
import theme from './theme';

const store = getClientStore();

const App = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};


export default hot(App);
