import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button } from '../Elements';
import { expensePropType } from './propTypes';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    const { expense } = props;
    this.state = {
      isCreate: !expense.id,
      name: expense.name,
    };
  }

  handleChange = name => ({ target }) => {
    this.setState({
      [name]: target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { onSave } = this.props;
    onSave({
      name,
    });
  }

  render() {
    const { isCreate, name } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {isCreate && <TextInput label="Name" value={name} onChange={this.handleChange('name')} />}
        {!isCreate && <h4>{name}</h4>}
        {isCreate && (
          <Button disabled={name.length === 0} type="submit">
            Save
          </Button>)}
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  expense: expensePropType,
  onSave: PropTypes.func,
};
ExpenseForm.defaultProps = {
  expense: {
    id: null,
    name: '',
  },
  onSave: () => {},
};

export default ExpenseForm;
