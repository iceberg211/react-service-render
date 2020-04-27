import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { hot } from 'react-hot-loader/root'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { getClientStore } from "./store";
import routes from "./routes";
import red from '@material-ui/core/colors/red';

const store = getClientStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});


const App = () => {
  React.useEffect(() => {
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
