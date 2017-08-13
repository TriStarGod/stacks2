import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    // super is similar to this.props = props; needed to call 'this' properly
    // in the component
    super(props);
    // app state is different from compoent state
    // app state is available to the entire app (ie database)
    // component state is only available to the component (ie nav collapse)
    this.state = { // only place to set state for component
      isOpen: false,
    };
    // Without binding the function, a new version of toggleNavbar is created 
    // every time react re-renders, yet calling toggleNavbar will run an old
    // version of toggleNavbar which no longer exists, throwing an error
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <header className="wrapper">
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggleNavbar} />
          <NavbarBrand tag={Link} to="/">Task Management</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/api/auth/login">Log In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/api/auth/register">Register</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

