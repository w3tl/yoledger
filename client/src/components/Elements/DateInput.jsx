import React from 'react';
import { DateInput as DI } from 'semantic-ui-calendar-react';

function DateInput(props) {
  return <DI {...props} />;
}

DateInput.propTypes = {};
DateInput.defaultProps = {};

export default DateInput;
