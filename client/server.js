import React from 'react'
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from './routes';


const creatApp = (req, store, context) => {
  return (
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <>
          {renderRoutes(routes)}
        </>
      </StaticRouter>
    </Provider>
  )
}

export default creatApp;