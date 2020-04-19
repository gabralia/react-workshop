import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Form } from './containers/form';
import { Info } from "./containers/info";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/">
                <Form/>
            </Route>
            <Route exact path="/info">
                <Info/>
            </Route>
        </Switch>
    </Router>,
    document.getElementById('root'));

