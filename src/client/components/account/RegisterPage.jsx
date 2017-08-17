import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Alert } from 'reactstrap';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import map from 'lodash/map';

import { AUTH_REGISTER, AUTH_IF_EXISTS } from '../../redux/auth';
// import validateInput from '../../validator/auth/register';
import validateInput from '../../../server/shared/validator/auth/register';
import FormGroupText from '../shared/FormGroupText';
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
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
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
  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    if (this.isValid()) {
      this.props.AUTH_REGISTER(this.onSuccess, this.onError, this.state.email,
        this.state.username, this.state.password, this.state.passwordConfirmation,
        this.state.firstName, this.state.lastName, this.state.role);
    }
  }
  onSuccess() {
    this.props.FLASHMESSAGE_ADD({
      type: 'success',
      text: 'You signed up successfully. Welcome!',
    });
    this.setState({ errors: {}, isLoading: false });
    this.props.history.push('/');
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
    const errors = this.state.errors;
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <Form onSubmit={this.onSubmit}>
            <FormGroupText
              id="email"
              value={this.state.email}
              error={errors.email}
              label="Email"
              onChange={this.onChange}
              onBlur={this.ifExists}
            />
            <FormGroupText
              id="username"
              value={this.state.username}
              error={errors.username}
              label="Username"
              onChange={this.onChange}
              onBlur={this.ifExists}
            />
            <FormGroupText
              id="firstName"
              value={this.state.firstName}
              error={errors.firstName}
              label="First Name"
              onChange={this.onChange}
            />
            <FormGroupText
              id="lastName"
              value={this.state.lastName}
              error={errors.lastName}
              label="Last Name"
              onChange={this.onChange}
            />
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
            <FormGroupText
              id="password"
              value={this.state.password}
              error={errors.password}
              label="Password"
              type="password"
              onChange={this.onChange}
            />
            <FormGroupText
              id="passwordConfirmation"
              value={this.state.passwordConfirmation}
              error={errors.passwordConfirmation}
              label="Password Confirmation"
              type="password"
              onChange={this.onChange}
            />
            <Button
              disabled={this.state.isLoading
              || this.state.errors.email
              || this.state.errors.username}
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
  history: PropTypes.object.isRequired,
};

// function mapDispatchToProps() {
//   // return { AUTH_REGISTER: bindActionCreators(AUTH_REGISTER, dispatch) };
// }
// null is needed for mapStateToProps which isn't used the following code
// export default connect(null, mapDispatchToProps)(RegisterPage);
export default connect(null, { AUTH_REGISTER, AUTH_IF_EXISTS, FLASHMESSAGE_ADD })(RegisterPage);
