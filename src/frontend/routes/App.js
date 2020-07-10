import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "../containers/Main";
import Login from '../containers/Login'
import Register from '../containers/Register'
import Notfound from "../containers/notFound";
import "../assets/styles/App.scss";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route component={Notfound} />
        </Switch>
    </BrowserRouter>
);

export default App;
