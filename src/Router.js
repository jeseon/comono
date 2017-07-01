import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, Comments, Login } from './routes';
import App from './App';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <App>
        <Route exact path="/" component={Home}/>
        <Route path="/comments" component={Comments}/>
        <Route path="/login" component={Login}/>
      </App>
    </Switch>
  </BrowserRouter>
);

export default Router;