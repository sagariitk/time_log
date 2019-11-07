import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components_with_router/Home';
import Dashboard from './components_with_router/Dashboard';
import GetLogs from "./components_with_router/GetLogs";
import Log from './components_with_router/Log';
import Login from './components_with_router/Login';
import Register from './components_with_router/Register';
import Error from './components_with_router/Error';

import './App.css';

export default class App extends React.Component {
    render() {
        return(
            <div>
            <BrowserRouter>
            <div>
                {/* <Navigation /> */}
                <Switch>
                    <Route path = "/" component = {Home} exact  />
                    <Route path = "/Log" component = {Log} exact  />
                    <Route path = "/Dashboard" component = {Dashboard} exact  />
                    <Route path = "/GetLogs" component = {GetLogs} exact  />
                    <Route path = "/Login" component = {Login} exact  />
                    <Route path = "/Register" component = {Register} exact  />
                    <Route component = {Error} />
                    </Switch>
            </div>
            </BrowserRouter>
            </div>
        )
    }
}

