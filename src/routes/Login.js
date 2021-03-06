import React from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import { login } from "../services/auth";

export default class Login extends React.Component {
  state = {
    email: null,
    password: null,
    message: null
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    login(email, password)
      .catch(error => {
        console.log(error);
        this.setState({message: "Invalid username/password."});
      });
  };

  render() {
    const { message } = this.state;

    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column style={{width: '450px'}}>
          <Segment stacked>
            <Form size="large">
              <Form.Input placeholder='Email' type="email" icon='user' iconPosition='left' onChange={this.handleEmail}/>
              <Form.Input placeholder='Password' type="password" icon='lock' iconPosition='left'  onChange={this.handlePassword}/>
              <Button fluid size="large" color="teal" type='submit' onClick={this.handleSubmit}>Login</Button>
            </Form>
          </Segment>
          <Message>
            New to us? <Link to="/signup">Sign Up</Link>
          </Message>
          {
            message &&
            <Message negative style={{textAlign: 'left'}}>
              <Message.Header>We're sorry we can't apply that discount</Message.Header>
              <p>{ message }</p>
            </Message>
          }
        </Grid.Column>
      </Grid>
    );
  }
}