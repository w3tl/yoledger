import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import moment from 'moment';
import { periodPropType } from './propTypes';

class BudgetTable extends React.Component {
  static propTypes = {
    periods: PropTypes.arrayOf(periodPropType),
    onPeriodChange: PropTypes.func,
  }

  static defaultProps = {
    periods: [],
    onPeriodChange: () => {},
  }

  handlePeriodChange = sign => () => {
    const { onPeriodChange, periods } = this.props;
    if (sign > 0) {
      onPeriodChange(periods[1]);
    } else {
      const date = new Date(periods[0]);
      date.setDate(date.getDate() - 1);
      onPeriodChange(date.toISOString());
    }
  }

  render() {
    const { periods } = this.props;

    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Button.Group icon>
              <Button id="prevButton" icon="left chevron" onClick={this.handlePeriodChange(-1)} />
              <Button id="nextButton" icon="right chevron" onClick={this.handlePeriodChange(1)} />
            </Button.Group>
          </Table.HeaderCell>
          {periods.map(period => (
            <Table.HeaderCell key={period}>{moment(period).format('D MMM')}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    );
  }
}

export default BudgetTable;
