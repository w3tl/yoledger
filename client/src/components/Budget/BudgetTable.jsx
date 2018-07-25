import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from '../Elements';
import { periodPropType } from '../propTypes';

class BudgetTable extends React.Component {
  static propTypes = {
    periods: PropTypes.arrayOf(periodPropType),
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  handleNext = () => {
    const { onChange } = this.props;
    onChange('next');
  }

  render() {
    const { periods, children } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th key="firstColumn">
              Account
            </th>
            {periods.map(period => (
              <th key={period.dateStart}>
                {moment(period.dateStart).format('D MMM')}
              </th>
            ))}
            <th key="nextButtonColumn">
              <Button onClick={this.handleNext}>Next</Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    );
  }
}

BudgetTable.defaultProps = {
  periods: [],
};

export default BudgetTable;
