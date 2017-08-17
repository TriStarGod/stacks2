import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, Alert } from 'reactstrap';

const FormGroupText = ({ type, label, id, value, error, onChange, onBlur }) => (
  <FormGroup color={error ? 'danger' : ''}>
    <Label for={id}>{label}</Label>
    <input
      className="form-control"
      type={type}
      id={id}
      placeholder={value}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
    {error && <Alert color="danger">{error}</Alert>}
  </FormGroup>
);

FormGroupText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

FormGroupText.defaultProps = {
  type: 'text',
  value: '',
  error: '',
  onBlur: null,
};

export default FormGroupText;
