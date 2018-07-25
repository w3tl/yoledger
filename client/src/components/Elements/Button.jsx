/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

function Button({ type, children, ...props }) {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
