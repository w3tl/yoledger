import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

function AccountInput({ value, onChange, ...props }) {
  return (
    <Input
      {...props}
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

export default AccountInput;
