import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react';
import { Form } from '../Elements';
import { expensePropType } from './propTypes';

class ExpenseForm extends React.Component {
  static propTypes = {
    expense: expensePropType,
    onSave: PropTypes.func,
  }

  static defaultProps = {
    expense: { id: null, name: '' },
    onSave: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      isCreate: !props.expense.id,
      name: props.expense.name,
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { onSave } = this.props;
    onSave({ variables: { input: { name, type: 'EXPENSE' } } });
  }

  render() {
    const { isCreate, name } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} {...this.props}>
        <Form.Field control={Input} name={name} label="Name" value={name} onChange={this.handleChange} />
        <Button disabled={name.length === 0 || !isCreate} type="submit">Save</Button>
      </Form>
    );
  }
}

export default ExpenseForm;
