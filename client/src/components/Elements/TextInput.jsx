import React from 'react';
import PropTypes from 'prop-types';
import { withLabel } from './utils';

function TextInput({
  value, warning, onChange, ...props
}) {
  return (
    <input value={value} onChange={onChange} {...props} />
  );
}

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

TextInput.defaultProps = {
  value: '',
  onChange: () => {},
};

export default withLabel(TextInput);
