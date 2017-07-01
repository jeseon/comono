import React from 'react';
import { Header, Content } from './components';

const App = ({ children, location }) => (
  <div>
    <Header location={ location }/>
    <Content>
      { children }
    </Content>
  </div>
);

export default App;
