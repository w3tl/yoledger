import React from 'react';
import PropTypes from 'prop-types';
import BudgetTableBody from './BudgetTableBody';

class BudgetTable extends React.Component {
  static propTypes = {
    body: PropTypes.func,
  }

  static defaultProps = {
    body: BudgetTableBody,
  }

  constructor(props) {
    super(props);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.state = {
      dateStart: currentDate.toISOString(),
      count: 6,
    };
  }

  handleHeaderClick = (dateStart) => {
    this.setState({
      dateStart,
    });
  }

  render() {
    const { body: Body } = this.props;
    const { dateStart, count } = this.state;

    return (
      <div>
        <Body dateStart={dateStart} count={count} onPeriodChange={this.handleHeaderClick} />
      </div>
    );
  }
}

export default BudgetTable;
