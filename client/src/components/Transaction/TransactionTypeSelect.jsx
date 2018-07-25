import React from 'react';
import PropTypes from 'prop-types';
import { withLabel } from '../Elements/utils';

class TransactionTypeSelect extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOf(['income', 'expense']),
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleChange = value => () => {
    const { onChange } = this.props;
    this.setState({
      value,
    });
    onChange({ target: { value } });
  }

  render() {
    const { name } = this.props;
    const { value } = this.state;

    return (
      <div>
        <input type="radio" name={name} value="income" id="income" checked={value === 'income'} onChange={this.handleChange('income')} />
        <label htmlFor="income">Income</label>
        <input type="radio" name={name} value="expense" id="expense" checked={value === 'expense'} onChange={this.handleChange('expense')} />
        <label htmlFor="expense">Expense</label>
      </div>);
  }
}

TransactionTypeSelect.defaultProps = {
  name: 'switch',
  value: 'expense',
  onChange: () => {},
};

export default withLabel(TransactionTypeSelect);
