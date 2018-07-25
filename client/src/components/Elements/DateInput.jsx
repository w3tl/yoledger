import React from 'react';
import PropTypes from 'prop-types';
import { withLabel } from './utils';

function DateInput({ value, onChange, ...props }) {
  return (
    <input type="date" value={value} onChange={onChange} {...props} />
  );
}

DateInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

DateInput.defaultProps = {
  value: '',
  onChange: () => {},
};

export default withLabel(DateInput);
