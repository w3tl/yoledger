import React from 'react';
import PropTypes from 'prop-types';
import BudgetTable from './BudgetTable';
import withData from './BudgetTableHOC';
import { getPeriods } from './utils';
import { periodPropType } from './propTypes';

class BudgetPage extends React.Component {
  static propTypes = {
    initialState: PropTypes.shape({ // eslint-disable-line react/require-default-props
      periods: PropTypes.arrayOf(periodPropType),
    }),
    control: PropTypes.func,
  }

  static defaultProps = {
    control: withData(BudgetTable),
  }

  constructor(props) {
    super(props);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const { initialState = {} } = this.props;
    const periods = getPeriods(currentDate.toISOString(), 6, {
      type: 'dayOfMonth', options: [10, 25],
    });
    this.state = {
      periods,
      ...initialState,
    };
  }

  handleHeaderClick = (dateStart) => {
    const periods = getPeriods(dateStart, 6, {
      type: 'dayOfMonth', options: [10, 25],
    });
    this.setState({ periods });
  }

  render() {
    const { control: Comp } = this.props;
    const { periods } = this.state;

    return (
      <Comp
        dateStart={periods[0].toISOString()}
        dateEnd={periods[periods.length - 1].toISOString()}
        periods={periods}
        onPeriodChange={this.handleHeaderClick}
      />
    );
  }
}

export default BudgetPage;
