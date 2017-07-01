import React, { Component } from 'react';
import { auth, firebaseAuth, isAuthenticated } from '../firebase';
import 'firebaseui/dist/firebaseui.css';
import './Login.css';

class Login extends Component {
  state = {
    isAuthenticated: false
  }

  componentDidMount() {
    this.setState({
      isAuthenticated: isAuthenticated()
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    const { isAuthenticated } = nextProps;

    if (!isAuthenticated)
      firebaseAuth('#firebaseui-auth-container');
  }

  handleLogout = () => {
    auth.signOut();
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div id="container">
        <div id="main">
          <div id="user-signed-in" className="hidden">
            <div id="user-info">
              <div id="photo-container">
                <img id="photo" alt="User"/>
              </div>
              <div id="name"></div>
              <div id="email"></div>
              <div id="phone"></div>
            </div>
            {isAuthenticated ?
              <p>
                <button id="sign-out" onClick={this.handleLogout}>Logout</button>
                <button id="delete-account">Delete account</button>
              </p> : null
            }
          </div>
          <div id="user-signed-out" className="hidden">
            <div id="firebaseui-auth-container"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;