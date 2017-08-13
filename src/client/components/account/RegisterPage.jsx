import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Alert } from 'reactstrap';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
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
      errors: {},
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      role: roles.public,
      dropdownOpen: false,
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitCB = this.onSubmitCB.bind(this);
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
  onSubmit(e) {
    e.preventDefault();
    console.log('submit running');
    // if (this.state.passwordConfirmation !== this.state.password) {
    //   this.onError("Password doesn't match!");
    //   return;
    // }
    // console.log(this.state);
    this.props.AUTH_REGISTER(this.onSubmitCB, this.state.email, this.state.username,
      this.state.password, this.state.passwordConfirmation, this.state.firstName,
      this.state.lastName, this.state.role);
    // console.log(mapDispatchToProps);
    // console.log(this.props.AUTH_LOGIN_ASYNC);
    // console.log(`${this.state.email} ${this.state.password}`);
  }
  onSubmitCB(errors, isLoading) {
    this.setState({ errors, isLoading });
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
    const errors = this.state.errors;
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <Form onSubmit={this.onSubmit}>
            <FormGroup color={errors.email ? 'danger' : ''}>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.email && <Alert color="danger">{errors.email}</Alert>}
            </FormGroup>
            <FormGroup color={errors.username ? 'danger' : ''}>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.onChange}
              />
              {errors.username && <Alert color="danger">{errors.username}</Alert>}
            </FormGroup>
            <FormGroup color={errors.firstName ? 'danger' : ''}>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.onChange}
              />
              {errors.firstName && <Alert color="danger">{errors.firstName}</Alert>}
            </FormGroup>
            <FormGroup color={errors.lastName ? 'danger' : ''}>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.onChange}
              />
              {errors.lastName && <Alert color="danger">{errors.lastName}</Alert>}
            </FormGroup>
            <FormGroup color={errors.role ? 'danger' : ''}>
              <Label for="role">Role</Label>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  {this.state.role}
                </DropdownToggle>
                <DropdownMenu>
                  {options}
                </DropdownMenu>
              </Dropdown>
              {errors.role && <Alert color="danger">{errors.role}</Alert>}
            </FormGroup>
            <FormGroup color={errors.password ? 'danger' : ''}>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && <Alert color="danger">{errors.password}</Alert>}
            </FormGroup>
            <FormGroup color={errors.passwordConfirmation ? 'danger' : ''}>
              <Label for="passwordConfirmation">Confirm Password</Label>
              <Input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                placeholder="password"
                value={this.state.passwordConfirmation}
                onChange={this.onChange}
              />
              {errors.passwordConfirmation
              && <Alert color="danger">{errors.passwordConfirmation}</Alert>}
            </FormGroup>
            <Button disabled={this.state.isLoading}>Register</Button>
          </Form>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  AUTH_REGISTER: PropTypes.func.isRequired,
};

// function mapDispatchToProps() {
//   // return { AUTH_REGISTER: bindActionCreators(AUTH_REGISTER, dispatch) };
// }
// null is needed for mapStateToProps which isn't used the following code
// export default connect(null, mapDispatchToProps)(RegisterPage);
export default connect(null, { AUTH_REGISTER })(RegisterPage);
