import React from 'react';
import { Button, Checkbox, Form, Grid, Message, Segment } from 'semantic-ui-react';
import { login } from "../services/auth";

export default class Login extends React.Component {
  state = {
    email: null,
    password: null,
    loginMessage: null
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
        this.setState({loginMessage: "Invalid username/password."});
      });
  };

  render() {
    const { loginMessage } = this.state;

    return (
      <Grid centered verticalAlign="middle">
        <Grid.Column style={{width: '450px'}}>
          <Segment stacked>
            <Form size="large">
              <Form.Input placeholder='Email' type="email" icon='user' iconPosition='left' onChange={this.handleEmail}/>
              <Form.Input placeholder='Password' type="password" icon='lock' iconPosition='left'  onChange={this.handlePassword}/>
              <Form.Field>
                <Checkbox label="I agree to the Terms and Conditions"/>
              </Form.Field>
              <Button fluid size="large" color="teal" type='submit' onClick={this.handleSubmit}>Login</Button>
            </Form>
          </Segment>
          {
            loginMessage &&
            <Message negative style={{textAlign: 'left'}}>
              <Message.Header>We're sorry we can't apply that discount</Message.Header>
              <p>{ loginMessage }</p>
            </Message>
          }
        </Grid.Column>
      </Grid>
    );
  }
}