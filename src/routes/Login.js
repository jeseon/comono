import React, { Component } from 'react';
import { Button, Card, Container, Image } from 'semantic-ui-react';
import { firebaseApp, firebaseAuth } from '../firebase';
import 'firebaseui/dist/firebaseui.css';

const userInfo = (user, onLogout, onDelete) => (
  <Card>
    <Card.Content>
      <Image id="photo" floated='right' size='mini' src={ user.photoURL }/>
      <Card.Header id="name">
        { user.displayName }
      </Card.Header>
      <Card.Meta id="email">
        { user.email }
      </Card.Meta>
      <Card.Description>
        Steve wants to add you to the group <strong>best friends</strong>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className='ui two buttons'>
        <Button color='green' onClick={onLogout}>Logout</Button>
        <Button color='red' onClick={onDelete}>Delete</Button>
      </div>
    </Card.Content>
  </Card>
);

class Login extends Component {
  state = {
    user: null
  };

  onLogined = user => this.setState({ user });

  onLogout = () => {
    this.setState({ user: null }, () => {
      firebaseApp.auth().signOut();
      firebaseAuth('#firebaseui-auth-container', this.onLogined);
    });
  };

  onDelete = () => {
    firebaseApp.auth().currentUser.delete()
      .then(() => this.setState({ user: null }, () => {
        firebaseAuth('#firebaseui-auth-container', this.onLogined);
      }))
      .catch(error => {
        if (error.code === 'auth/requires-recent-login') {
          firebaseApp.auth().signOut().then(() => {
            setTimeout(() => {
              console.log('Please sign in again to delete your account.');
            }, 1);
          });
        }
      });
  };

  getUserStat = elemt => (
    new Promise((resolve, reject) => {
      firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject(elemt);
        }
      });
    })
  );

  componentDidMount() {
    this.getUserStat('#firebaseui-auth-container')
      .then(user => this.setState({ user }))
      .catch(elemt => firebaseAuth(elemt, this.onLogined));
  }

  render() {
    const { user } = this.state;

    return (
      <Container>
        { user ? userInfo(user, this.onLogout, this.onDelete) : null }
        <div id="firebaseui-auth-container"/>
      </Container>
    );
  }
}

export default Login;