import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Home, Comments, Login, SignUp } from './routes';
import { firebaseAuth } from './config/firebase';
import App from './App';

const PublicRoute = ({component: Component, authed, ...rest}) => (
  <Route
    {...rest}
    render={props => authed === false
      ? <Component {...props} />
      : <Redirect to='/' />}
  />
);

const PrivateRoute = ({component: Component, authed, ...rest}) => (
  <Route
    {...rest}
    render={props => authed === true
      ? <Component {...props} />
      : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
  />
);

export default class Router extends React.Component {
  state = {
    authed: false,
    loading: true,
  };

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    const { authed } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <App>
            <Route exact path="/" component={Home}/>
            <PublicRoute path="/login" authed={authed} component={Login}/>
            <PublicRoute path="/signup" authed={authed} component={SignUp}/>
            <PrivateRoute path="/comments" authed={authed} component={Comments}/>
          </App>
        </Switch>
      </BrowserRouter>
    );
  }
}