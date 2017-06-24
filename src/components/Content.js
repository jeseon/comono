import React from 'react';
import { Container } from 'semantic-ui-react';

const Content = ({ children }) => (
  <Container style={{ marginTop: 80 }}>
    { children }
  </Container>
);

export default Content;