import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Button, Dropdown, Menu,
} from 'semantic-ui-react';
import TransactionForm from './TransactionFormHOC';
import TransactionList from './TransactionListHOC';

const options = [{
  value: 'DAY', text: 'day',
}, {
  value: 'WEEK', text: 'week',
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

  handlePeriodChange = (e, { value }) => {
    const { date, onChangePeriod } = this.props;
    onChangePeriod({ variables: { period: value, date } });
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
        <Menu>
          <Menu.Item>
            <Button primary onClick={this.handleAddClick}>Add</Button>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={this.handleChangeDateClick(-1)} icon="left chevron" />
            <span style={{ margin: '0 5px' }}>
              {moment(new Date(date)).format('MMM Do YY')}
            </span>
            <Button onClick={this.handleChangeDateClick(1)} icon="right chevron" />
          </Menu.Item>
          <Menu.Item>
            <span>
              Show per{' '}
              <Dropdown inline options={options} value={period} onChange={this.handlePeriodChange} />
            </span>
          </Menu.Item>
        </Menu>
        {isAddMode && (
          <TransactionForm dateStart={date} dateEnd={dateEnd} onClose={this.handleAddClick} />
        )}
        <TransactionList dateStart={date} dateEnd={dateEnd} {...this.props} />
      </div>
    );
  }
}

export default TransactionPage;
