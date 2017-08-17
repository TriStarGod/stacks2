import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Alert } from 'reactstrap';
import { connect } from 'react-redux';

import validateInput from '../../validator/auth/login';
import FormGroupText from '../shared/FormGroupText';
import { AUTH_LOGIN } from '../../redux/auth';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      email: '',
      password: '',
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onError = this.onError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  onError(errors) {
    this.setState({ errors, isLoading: false });
  }
  onSuccess() {
    this.setState({ errors: {}, isLoading: false });
    this.props.history.push('/');
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    // this.props.AUTH_LOGIN(this.onSuccess, this.onError, this.state.email, this.state.password);
    if (this.isValid()) {
      this.props.AUTH_LOGIN(this.onSuccess, this.onError, this.state.email, this.state.password);
    }
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors, isLoading: false });
    }
    return isValid;
  }
  render() {
    const { errors, email, password, isLoading } = this.state;
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <Form onSubmit={this.onSubmit}>
            <h1>Login</h1>
            {errors.form && <Alert color="danger">{errors.form}</Alert>}
            <FormGroupText
              id="email"
              value={email}
              error={errors.email}
              label="Email"
              onChange={this.onChange}
              onBlur={this.ifExists}
            />
            <FormGroupText
              id="password"
              value={password}
              error={errors.password}
              label="Password"
              type="password"
              onChange={this.onChange}
            />
            <Button disabled={isLoading}>Log In</Button>
          </Form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  AUTH_LOGIN: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// null is needed for mapStateToProps which isn't used the following code
export default connect(null, { AUTH_LOGIN })(LoginPage);
