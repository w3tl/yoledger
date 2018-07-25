import React from 'react';
import PropTypes from 'prop-types';
import { withLabel } from '../Elements/utils';

function AccountInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
    />);
}

AccountInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

AccountInput.defaultProps = {
  value: '',
  onChange: () => {},
};

export default withLabel(AccountInput);
