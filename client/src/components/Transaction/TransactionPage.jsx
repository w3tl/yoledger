import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Select, Button } from '../Elements';
import TransactionForm from './TransactionFormHOC';
import TransactionList from './TransactionListHOC';

const options = [{
  value: 'DAY', label: 'day',
}, {
  value: 'WEEK', label: 'week',
}];

export function getDateEnd(period, date) {
  const dateEnd = new Date(date);
  if (period === 'DAY') dateEnd.setDate(dateEnd.getDate() + 1);
  if (period === 'WEEK') dateEnd.setDate(dateEnd.getDate() + 7);
  return dateEnd;
}

class TransactionPage extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    period: PropTypes.oneOf(['DAY', 'WEEK']).isRequired,
    onChangePeriod: PropTypes.func,
  }

  state = {
    isAddMode: false,
  }

  static defaultProps = {
    onChangePeriod: () => {},
  }

  handleAddClick = () => {
    this.setState(prevState => ({ isAddMode: !prevState.isAddMode }));
  }

  handlePeriodChange = (e) => {
    const { date, onChangePeriod } = this.props;
    onChangePeriod({ variables: { period: e.target.value, date } });
  }

  handleChangeDateClick = sign => () => {
    const { period, date, onChangePeriod } = this.props;
    const dateStart = new Date(date);
    if (period === 'WEEK') {
      dateStart.setDate(dateStart.getDate() + sign * 7);
    } else {
      dateStart.setDate(dateStart.getDate() + sign);
    }
    onChangePeriod({ variables: { period, date: dateStart } });
  }

  render() {
    const {
      date, period,
    } = this.props;
    const { isAddMode } = this.state;
    const dateEnd = getDateEnd(period, date).toISOString();
    return (
      <div>
        <div>
          <Button id="addTrans" onClick={this.handleAddClick}>Add</Button>
          <Button id="prevButton" onClick={this.handleChangeDateClick(-1)}>Prev</Button>
          {moment(new Date(date)).format('MMM Do YY')}
          <Button id="nextButton" onClick={this.handleChangeDateClick(1)}>Next</Button>
          <Select label="Show by" options={options} value={period} onChange={this.handlePeriodChange} />
        </div>
        {isAddMode && (
          <TransactionForm dateStart={date} dateEnd={dateEnd} onClose={this.handleAddClick} />
        )}
        <TransactionList dateStart={date} dateEnd={dateEnd} {...this.props} />
      </div>
    );
  }
}

export default TransactionPage;
