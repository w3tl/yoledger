import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { Input } from 'semantic-ui-react';

function AmountInput({
  name, value, onChange, ...attrs
}) {
  return (
    <NumberFormat
      value={value}
      customInput={Input}
      thousandSeparator
      onValueChange={
        ({ value: newValue }) => onChange(
          { target: { value: newValue } },
          { name, value: newValue },
        )}
      name={name}
      {...attrs}
    />
  );
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

export default AmountInput;
