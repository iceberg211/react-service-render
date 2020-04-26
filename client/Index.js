import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
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

const render = (App) =>
  ReactDOM.hydrate(<App />, document.getElementById("root"));

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app.js", () => {
    const App = require("./app").default;
    render(App);
  });
}

render(App);
