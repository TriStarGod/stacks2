import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { AUTH_LOGOUT } from '../../redux/auth';
import { PROGRESS_INCREMENT } from '../../redux/progress';

class Header extends React.Component {
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
    this.logout = this.logout.bind(this);
    // Without binding the function, a new version of toggleNavbar is created 
    // every time react re-renders, yet calling toggleNavbar will run an old
    // version of toggleNavbar which no longer exists, throwing an error
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  logout(e) {
    e.preventDefault();
    this.props.AUTH_LOGOUT();
  }
  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    const guestLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/api/auth/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/api/auth/register">Register</NavLink>
        </NavItem>
      </Nav>
    );
    const authLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/api/auth/profile">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="#" onClick={this.logout}>Logout</NavLink>
        </NavItem>
      </Nav>
    );
    return (
      <header className="header clearfix">
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggleNavbar} />
          <NavbarBrand tag={Link} to="/">Task Management</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            { this.props.isAuthenticated ? authLinks : guestLinks }
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  AUTH_LOGOUT: PropTypes.func.isRequired,
};
// connect binds the app state to the component's props
// this won't overwrite other props sent from higher level components
// this will also cause the component to re-render on every app state change
export default connect(state => ({
  isAuthenticated: state.AUTH_LOGIN.isAuthenticated,
}), { AUTH_LOGOUT })(Header);
