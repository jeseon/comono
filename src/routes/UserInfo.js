import React, { Component } from 'react';
import { Button, Card, Container, Image } from 'semantic-ui-react';
import { firebaseAuth, firebaseUiStart } from '../config/firebase';
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

export default class UserInfo extends Component {
  state = {
    user: null
  };

  onLogined = user => this.setState({ user });

  onLogout = () => {
    this.setState({ user: null }, () => {
      firebaseAuth().signOut();
      firebaseUiStart('#firebaseui-auth-container');
    });
  };

  onDelete = () => {
    firebaseAuth().currentUser.delete()
      .then(() => this.setState({ user: null }, () => {
        firebaseUiStart('#firebaseui-auth-container');
      }))
      .catch(error => {
        if (error.code === 'auth/requires-recent-login') {
          firebaseAuth().signOut().then(() => {
            setTimeout(() => {
              console.log('Please sign in again to delete your account.');
            }, 1);
          });
        }
      });
  };

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      } else {
        firebaseUiStart('#firebaseui-auth-container')
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
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