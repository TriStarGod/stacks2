import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map';

import { AUTH_REGISTER } from '../../redux/auth';

const roles = {
  public: 'Public',
  staff: 'Staff',
  admin: 'Administrator',
};

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      role: roles.public,
      dropdownOpen: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onError = this.onError.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClick(e) {
    this.setState({
      role: e.currentTarget.textContent,
    });
  }
  onError(errors) {
    this.setState({ errors });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log('submit running');
    if (this.state.passwordConfirmation !== this.state.password) {
      this.onError("Password doesn't match!");
      return;
    }
    // console.log(this.state);
    this.props.AUTH_REGISTER(this.onError, this.state.email, this.state.username,
      this.state.password, this.state.firstName, this.state.lastName,
      this.state.role);
    // console.log(mapDispatchToProps);
    // console.log(this.props.AUTH_LOGIN_ASYNC);
    // console.log(`${this.state.email} ${this.state.password}`);
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  render() {
    const options = map(roles, (value, key) =>
      <DropdownItem key={key} onClick={this.onClick}>{value}</DropdownItem>,
    );
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.onChange}
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for="role">Role</Label>
              <select
                name="role"
                id="role"
                value={this.state.role}
                onChange={this.onChange}
              >
                <option value="" disabled>Choose Your Role</option>
                {options}
              </select>
            </FormGroup> */}
            <FormGroup>
              <Label for="role">Role</Label>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  {this.state.role}
                </DropdownToggle>
                <DropdownMenu>
                  {options}
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="passwordConfirmation">Confirm Password</Label>
              <Input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                placeholder="password"
                value={this.state.passwordConfirmation}
                onChange={this.onChange}
              />
            </FormGroup>
            <Button>Register</Button>
          </Form>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  AUTH_REGISTER: PropTypes.func.isRequired,
};

function mapDispatchToProps() {
  // return { AUTH_REGISTER: bindActionCreators(AUTH_REGISTER, dispatch) };
}
// null is needed for mapStateToProps which isn't used the following code
// export default connect(null, mapDispatchToProps)(RegisterPage);
export default connect(null, { AUTH_REGISTER })(RegisterPage);
