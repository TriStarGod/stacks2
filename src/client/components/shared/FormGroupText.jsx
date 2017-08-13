import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, Alert } from 'reactstrap';

const FormGroupText = ({ type, label, id, value, error, onChange }) => (
  <FormGroup color={error ? 'danger' : ''}>
    <Label for={id}>{label}</Label>
    <Input
      type={type}
      id={id}
      placeholder={id}
      value={value}
      onChange={onChange}
    />
    {error && <Alert color="danger">{error}</Alert>}
  </FormGroup>
);

FormGroupText.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
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
