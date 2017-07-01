import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, Comments, Login } from './routes';
import { auth, isAuthenticated } from './firebase';
import App from './App';

class Router extends Component {
  state = {
    isAuthenticated: false
  }

  componentDidMount() {
    this.setState({
      isAuthenticated: isAuthenticated()
    });
  }

  handleAuth = () => {
    this.setState({
      isAuthenticated: false
    }, auth.signOut);
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <App>
            <Route exact path="/" component={Home}/>
            <Route path="/comments" component={Comments}/>
            <Route path="/login"
                   render={() => <Login isAuthenticated={isAuthenticated} handleAuth={this.handleAuth}/>}/>
          </App>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;