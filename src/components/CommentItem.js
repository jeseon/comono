import React from 'react'
import { Comment } from 'semantic-ui-react'

const CommentItem = ({ id, date, author, avatar, content, children }) => (
  <Comment key={ id }>
    <Comment.Avatar src={ avatar }/>
    <Comment.Content>
      <Comment.Author as='a'>{ author }</Comment.Author>
      <Comment.Metadata>
        <div>{ date }</div>
      </Comment.Metadata>
      <Comment.Text>{ content }</Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
    {
      children &&
      <Comment.Group>
        {children.map(child => <CommentItem
          key={child.id}
          date={child.date}
          author={child.author}
          avatar={child.avatar}
          content={child.content}
          children={child.children}
        />)}
      </Comment.Group>
    }
  </Comment>
);

export default CommentItem