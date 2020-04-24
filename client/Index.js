import React from 'react'
import ReactDOM from 'react-dom'
import App from './app';

const render = App => ReactDOM.hydrate(<App />, document.getElementById('root'))

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app.js', () => {
    // eslint-disable-next-line global-require
    const App = require('./app').default // eslint-ignore-line
    render(App)
  })
}

render(App)
