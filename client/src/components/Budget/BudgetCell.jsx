import React from 'react';
import PropTypes from 'prop-types';
import AmountInput from '../AmountInput';

class BudgetCell extends React.Component {
  static propTypes = {
    amount: PropTypes.number,
    onUpdate: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: props.amount,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ amount: target.value });
  }

  handleSave = () => {
    const { amount } = this.state;
    if (amount) {
      const { onUpdate } = this.props;
      onUpdate({ amount });
    }
  }

  render() {
    const { amount } = this.state;
    return (
      <div style={{ flex: 3 }}>
        <AmountInput value={amount} onChange={this.handleChange} onBlur={this.handleSave} />
      </div>
    );
  }
}

BudgetCell.defaultProps = {
  amount: null,
  onUpdate: () => {},
};

export default BudgetCell;
