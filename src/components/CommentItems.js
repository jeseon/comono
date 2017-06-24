import React from 'react'
import { Comment, Segment } from 'semantic-ui-react'
import CommentItem from './CommentItem'

export default ({ loading, comments }) => (
  <Segment basic loading={ loading }>
    <Comment.Group>
      {comments ? comments.map(comment => <CommentItem
        key={ comment.id }
        date={ comment.date }
        author={ comment.author }
        avatar={ comment.avatar }
        content={ comment.content }
        children={ comment.children }
      />) : null}
    </Comment.Group>
  </Segment>
)