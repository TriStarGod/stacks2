import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, Alert } from 'reactstrap';

const FormGroupText = ({ type, label, id, value, error, onChange }) => (
  <FormGroup color={error ? 'danger' : ''}>
    <Label for={id}>{label}</Label>
    <Input
      type={type}
      id={id}
      placeholder={value}
      value={value}
      onChange={onChange}
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
};

FormGroupText.defaultProps = {
  type: 'text',
  value: '',
  error: '',
};

export default FormGroupText;
