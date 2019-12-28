// app/javascript/packs/index.js
import React from 'react';
import { render } from 'react-dom';
import Provider from '../components/Provider';
import Dashboard from '../components/Dashboard';
import AddTaskForm from '../components/AddTaskForm';
import UserInfo from '../components/UserInfo';
import App from '../components/App';
import {BrowserRouter as Router, Route} from 'react-router-dom';

render(
  <Router>
      <Provider>
        <App/>
      </Provider>
  </Router>
  ,
  document.querySelector('#root')
);