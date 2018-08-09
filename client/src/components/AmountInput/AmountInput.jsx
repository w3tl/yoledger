import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { withLabel } from '../Elements/utils';

function AmountInput({ value, onChange, ...attrs }) {
  return (
    <NumberFormat
      style={{ textAlign: 'right' }}
      value={value}
      thousandSeparator
      onValueChange={({ value: newValue }) => onChange({ target: { value: newValue } })}
      {...attrs}
    />);
}

AmountInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

AmountInput.defaultProps = {
  value: 0,
  onChange: () => {},
};

export default withLabel(AmountInput);
