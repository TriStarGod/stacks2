// import Validator from 'validator';
// import isEmpty from 'lodash/isEmpty';
const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validateInput(data) {
  const errors = {};
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  } else if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'This field is required';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'This field is required';
  }
  if (Validator.isEmpty(data.role)) {
    errors.role = 'This field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
