import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

class Header extends Component {
  state = {
    activeItem: ''
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    const { location } = this.props;
    const items = location.pathname.split('/').filter(i => i);

    this.setState({
      activeItem: items.length ? items[0] : 'home'
    });
  }

  render() {
    const { handleAuth } = this.props;
    const { activeItem } = this.state;

    return (
      <Menu inverted fixed="top">
        <Menu.Item icon name="menu" onClick={this.handleItemClick}><Icon name="content"/></Menu.Item>
        <Menu.Item name="home" as={Link} to="/" active={activeItem === "home"} onClick={this.handleItemClick}/>
        <Menu.Item name="comments" as={Link} to="/comments" active={activeItem === "comments"} onClick={this.handleItemClick}/>
        <Menu.Menu position="right">
          <Menu.Item name="login" as={Link} to="/login" active={activeItem === "login"} onClick={() => this.setState({activeItem: "login"}, handleAuth)}/>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;