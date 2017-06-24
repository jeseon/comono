import React, { Component } from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import * as firebase from 'firebase';
import CommentItems from '../components/CommentItems'

class Comments extends Component {
  state = {
    loading: true,
    comments: []
  };

  componentWillMount() {
    this.firedata = firebase.database().ref('/comments');
    this.firedata.on('value', snapshot => {
      this.setState({
        loading: false,
        comments: snapshot.val()
      })
    });
  }

  componentWillUnmount() {
    this.firedata.off();
  }

  render() {
    const { loading, comments } = this.state;

    return (
      <div>
        <Header as="h3" dividing>Comments</Header>
        <CommentItems loading={ loading } comments={ comments }/>
        <Form reply>
          <Form.TextArea />
          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </div>
    )
  }
}

export default Comments