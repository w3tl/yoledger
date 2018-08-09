import React from 'react';
import PropTypes from 'prop-types';
import BudgetTableHeader from './BudgetTableHeader';
import BudgetTableBody from './BudgetTableBody';

class BudgetTable extends React.Component {
  static propTypes = {
    header: PropTypes.func,
    body: PropTypes.func,
  }

  static defaultProps = {
    header: BudgetTableHeader,
    body: BudgetTableBody,
  }

  constructor(props) {
    super(props);
    this.state = {
      dateStart: new Date().toISOString(), // -1
      count: 6,
    };
  }

  handleHeaderClick = (dateStart) => {
    this.setState({
      dateStart,
    });
  }

  render() {
    const { header: Header, body: Body } = this.props;
    const { dateStart, count } = this.state;

    return (
      <div>
        <Header
          dateStart={dateStart}
          count={count}
          onPrev={this.handleHeaderClick}
          onNext={this.handleHeaderClick}
        />
        <Body dateStart={dateStart} count={count} />
      </div>
    );
  }
}

export default BudgetTable;
