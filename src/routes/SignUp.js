import React from 'react';
import { Button, Checkbox, Form, Grid, Message, Segment } from 'semantic-ui-react';
import { signup } from "../services/auth";

export default class SignUp extends React.Component {
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

    signup(email, password)
      .catch(error => {
        this.setState({ message: "Invalid username/password." });
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
              <Form.Field>
                <Checkbox label="I agree to the Terms and Conditions"/>
              </Form.Field>
              <Button fluid size="large" color="teal" type='submit' onClick={this.handleSubmit}>Sign Up</Button>
            </Form>
          </Segment>
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