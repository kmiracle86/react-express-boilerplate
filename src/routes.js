import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import history from './history';

const routes = (
  <Router history={history}>
    <Route path="/" component={App} />
  </Router>
);

export default routes;
