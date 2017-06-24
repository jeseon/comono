import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Content } from './components';
import { Home, Comments } from './routes';

const App = () => (
  <Router>
    <div>
      <Header/>
      <Content>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/comments" component={Comments}/>
        </Switch>
      </Content>
    </div>
  </Router>
);

export default App;
