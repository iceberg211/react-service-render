import React from 'react'
import ReactDOM from 'react-dom/server'
import App from '../client/server';

export default function serverRenderer() {
    const app = ReactDOM.renderToString(<App />)
    return (req, res, next) => {
        res.status(200).send(`
            <!doctype html>
            <html>
            <head>
                <title>App</title>
            </head>
            <body>
            <div id="root">${app}</div>
            <script src="/client.js"></script>
            </body>
            </html>
        `);
    };
}