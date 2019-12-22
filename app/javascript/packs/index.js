// app/javascript/packs/index.js
import React from 'react';
import { render } from 'react-dom';
import Provider from '../components/Provider';
import Dashboard from '../components/Dashboard';

render(
  <Provider>
    <Dashboard />
  </Provider>,
  document.querySelector('#root')
);