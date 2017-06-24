import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

const Header = () => (
  <Menu inverted fixed="top">
    <Container>
      <Menu.Item name="home" as={NavLink} to="/"/>
      <Menu.Item name="comments" as={NavLink} to="/comments"/>
      <Menu.Item name="friends"/>
    </Container>
  </Menu>
);

export default Header;