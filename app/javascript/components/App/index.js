import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from '../Home';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';

export default () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/register" component={RegisterPage}/>
        </Switch>
    </div>
    
);