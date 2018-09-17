import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'semantic-ui-react';
import { transactionTypePropType } from './propTypes';

class TransactionTypeSelect extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: transactionTypePropType,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleChange = value => () => {
    const { name, onChange } = this.props;
    this.setState({
      value,
    });
    onChange({ target: { value } }, { name, value });
  }

  render() {
    const { name } = this.props;
    const { value } = this.state;

    return (
      <Form.Group inline>
        <Form.Field>
          <Radio
            label="Income"
            name={name}
            value="income"
            checked={value === 'income'}
            onChange={this.handleChange('income')}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Expense"
            name={name}
            value="expense"
            checked={value === 'expense'}
            onChange={this.handleChange('expense')}
          />
        </Form.Field>
      </Form.Group>);
  }
}

TransactionTypeSelect.defaultProps = {
  name: 'transactionTypeSelect',
  value: 'expense',
  onChange: () => {},
};

export default TransactionTypeSelect;
