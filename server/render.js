import React from 'react';
import ReactDOM from 'react-dom/server'
import renderApp from '../client/server';
import { getStore } from '../client/store';
export default function serverRenderer() {
  return (req, res) => {

    const store = getStore(req);
    const App = renderApp(req, store, {});
    const html = ReactDOM.renderToString(App);

    res.status(200).send(`
      <!doctype html>
      <html>
      <head>
          <title>App</title>
      </head>
      <body>
      <div id="root">${html}</div>
      <script src="/client.js"></script>
      </body>
      </html>
  `);
  };
}

