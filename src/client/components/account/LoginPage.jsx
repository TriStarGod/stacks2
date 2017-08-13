import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.AUTH_LOGIN(this.onError, this.state.email, this.state.password);
    // console.log(mapDispatchToProps);
    // console.log(this.props.AUTH_LOGIN_ASYNC);
    // console.log(`${this.state.email} ${this.state.password}`);
  }
  onError(errors) {
    this.setState({ errors });
  }
  render() {
    const { email, password, errors, isLoading } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="text"
                name="email"
                id="exampleEmail"
                placeholder="some@email.com"
                value={email}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="somepassword"
                value={password}
                onChange={this.onChange}
              />
            </FormGroup>
            <Button disabled={isLoading}>Log In</Button>
          </Form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  AUTH_LOGIN: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return { AUTH_LOGIN: bindActionCreators(AUTH_LOGIN, dispatch) };
}
// null is needed for mapStateToProps which isn't used the following code
export default connect(null, mapDispatchToProps)(LoginPage);
