import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from '../Elements';
import widivData from './BudgetTableHeaderHOC';
// eslint-disable-next-line no-unused-vars
function BudgetTableHeader({ periods, onNext, onPrev }) {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div style={{ flex: '1 100px' }}>
        Account
      </div>
      {periods.map(date => (
        <div key={date} style={{ flex: 3 }}>
          {moment(date).format('D MMM')}
        </div>
      ))}
      <div style={{ flex: 1 }}>
        <Button id="nextButton" onClick={() => onNext(periods[1])}>Next</Button>
      </div>
    </div>
  );
}

BudgetTableHeader.propTypes = {
  periods: PropTypes.arrayOf(PropTypes.string),
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
};

BudgetTableHeader.defaultProps = {
  periods: [],
  onNext: () => {},
  onPrev: () => {},
};

export { BudgetTableHeader as BudgetTableHeaderComponent };
export default widivData(BudgetTableHeader);
