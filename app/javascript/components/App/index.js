import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from '../Home';
import LoginPage from '../LoginPage'

export default () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={LoginPage}/>
        </Switch>
    </div>
    
);