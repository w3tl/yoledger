import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button } from '../Elements';
import { incomePropType } from './propTypes';

class IncomeForm extends React.Component {
  constructor(props) {
    super(props);
    const { income } = props;
    this.state = {
      isCreate: !income.id,
      name: income.name,
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

IncomeForm.propTypes = {
  income: incomePropType,
  onSave: PropTypes.func,
};
IncomeForm.defaultProps = {
  income: {
    id: null,
    name: '',
  },
  onSave: () => {},
};

export default IncomeForm;
