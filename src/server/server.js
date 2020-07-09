import express from "express";
import webpack from "webpack";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { renderRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";
import helmet from "helmet";
import serverRoutes from "../frontend/routes/serverRoutes";
import reducer from "../frontend/reducers";
import getManifest from "./getManifest";
import { config } from "./config/index.js";
import cors from "cors";
import { registrationAndLoginAPI } from "./controllers/routes/routes";
import {
    errorHandler,
    logErrors,
    wrapErrors,
} from "./controllers/middlewares/errorHandler";

//Inicio del servidor
const app = express();

//Middleware CORS
app.use(cors());

//Parser a json
app.use(express.json());

if (config.env === "development") {
    console.log("Development mode");
    const webpackConfig = require("../../webpack.config");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const compiler = webpack(webpackConfig);
    const serverConfig = { port: config.port, hot: true };

    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use((req, res, next) => {
        if (!req.hashManifest) req.hashManifest = getManifest();
        next();
    });
    app.use(express.static(`${__dirname}/public`));
    app.use(helmet());
    app.use(helmet.permittedCrossDomainPolicies());
    app.disable("x-powered-by");
}

const setResponse = (html, preloadedState, manifest) => {
    const mainStyles = manifest ? manifest["main.css"] : "assets/app.css";
    const mainBuild = manifest ? manifest["main.js"] : "assets/app.js";

    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href=${mainStyles} type="text/css">
            <title>Prueba Tecnica Kuepa</title>
        </head>
        <body>
            <div id="app">${html}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(
        preloadedState
    ).replace(/</g, "\\u003c")}
            </script>
            <script src=${mainBuild} type="text/javascript"></script>
        </body>
        </html>`;
};

const rederApp = async (req, res) => {
    let initialState = {};
    const store = createStore(reducer, initialState);
    const preloadedState = store.getState();
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                {renderRoutes(serverRoutes)}
            </StaticRouter>
        </Provider>
    );
    res.send(setResponse(html, preloadedState, req.hashManifest));
};

//Routes controller
registrationAndLoginAPI(app);
app.get("*", rederApp);

//Catch errors
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port || 4000, () => {
    console.log(`Server listen on port: ${config.port}`);
});
