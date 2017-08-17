import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Button, Form, FormGroup, Label, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Alert } from 'reactstrap';
import { connect } from 'react-redux';

import validateInput from '../../validator/auth/register';
import FormGroupText from '../shared/FormGroupText';
import { AUTH_REGISTER, AUTH_IF_EXISTS } from '../../redux/auth';
import { FLASHMESSAGE_ADD } from '../../redux/flashMessage';

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
    this.onError = this.onError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.isValid = this.isValid.bind(this);
    this.ifExists = this.ifExists.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  onClick(e) {
    this.setState({
      role: e.currentTarget.textContent,
    });
  }
  onError(errors) {
    this.setState({ errors, isLoading: false });
  }
  onSuccess() {
    this.props.FLASHMESSAGE_ADD({
      type: 'success',
      text: 'You signed up successfully. Welcome!',
    });
    this.setState({ errors: {}, isLoading: false });
    this.props.history.push('/');
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    if (this.isValid()) {
      this.props.AUTH_REGISTER(this.onSuccess, this.onError, this.state.email,
        this.state.username, this.state.password, this.state.passwordConfirmation,
        this.state.firstName, this.state.lastName, this.state.role);
    }
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors, isLoading: false });
    }
    return isValid;
  }
  ifExists(e) {
    const id = e.target.id;
    const value = e.target.value;
    const errors = this.state.errors;
    if (value !== '') {
      this.props.AUTH_IF_EXISTS(id, value).then((res) => {
        errors[id] = res.data.user ? 'Already in use' : '';
        this.setState({ errors });
      });
    }
  }
  render() {
    const options = map(roles, (value, key) =>
      <DropdownItem key={key} onClick={this.onClick}>{value}</DropdownItem>,
    );
    const { errors, email, username, firstName, lastName, role,
      dropdownOpen, password, passwordConfirmation, isLoading } = this.state;
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <Form onSubmit={this.onSubmit}>
            <h1>Register</h1>
            <FormGroupText
              id="email"
              value={email}
              error={errors.email}
              label="Email"
              onChange={this.onChange}
              onBlur={this.ifExists}
            />
            <FormGroupText
              id="username"
              value={username}
              error={errors.username}
              label="Username"
              onChange={this.onChange}
              onBlur={this.ifExists}
            />
            <FormGroupText
              id="firstName"
              value={firstName}
              error={errors.firstName}
              label="First Name"
              onChange={this.onChange}
            />
            <FormGroupText
              id="lastName"
              value={lastName}
              error={errors.lastName}
              label="Last Name"
              onChange={this.onChange}
            />
            <FormGroup color={errors.role ? 'danger' : ''}>
              <Label for="role">Role</Label>
              <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  {role}
                </DropdownToggle>
                <DropdownMenu>
                  {options}
                </DropdownMenu>
              </Dropdown>
              {errors.role && <Alert color="danger">{errors.role}</Alert>}
            </FormGroup>
            <FormGroupText
              id="password"
              value={password}
              error={errors.password}
              label="Password"
              type="password"
              onChange={this.onChange}
            />
            <FormGroupText
              id="passwordConfirmation"
              value={passwordConfirmation}
              error={errors.passwordConfirmation}
              label="Password Confirmation"
              type="password"
              onChange={this.onChange}
            />
            <Button
              disabled={isLoading
              || !!errors.email
              || !!errors.username}
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  AUTH_REGISTER: PropTypes.func.isRequired,
  FLASHMESSAGE_ADD: PropTypes.func.isRequired,
  AUTH_IF_EXISTS: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// function mapDispatchToProps() {
//   // return { AUTH_REGISTER: bindActionCreators(AUTH_REGISTER, dispatch) };
// }
// null is needed for mapStateToProps which isn't used the following code
// export default connect(null, mapDispatchToProps)(RegisterPage);
export default connect(null, { AUTH_REGISTER, AUTH_IF_EXISTS, FLASHMESSAGE_ADD })(RegisterPage);
