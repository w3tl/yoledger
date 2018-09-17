import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react';
import { Form } from '../Elements';
import { incomePropType } from './propTypes';

class IncomeForm extends React.Component {
  static propTypes = {
    income: incomePropType,
    onSave: PropTypes.func,
  }

  static defaultProps = {
    income: { id: null, name: '' },
    onSave: () => {},
  }

  constructor(props) {
    super(props);
    const { income } = props;
    this.state = {
      isCreate: !income.id,
      name: income.name,
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { onSave } = this.props;
    onSave({ variables: { input: { name, type: 'INCOME' } } });
  }

  render() {
    const { isCreate, name } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} {...this.props}>
        <Form.Field control={Input} label="Name" name="name" value={name} onChange={this.handleChange} />
        {isCreate && <Button disabled={name.length === 0} type="submit">Save</Button>}
      </Form>
    );
  }
}

export default IncomeForm;
