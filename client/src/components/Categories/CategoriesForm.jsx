import React from 'react';
import PropTypes from 'prop-types';
import { Button, Radio } from 'semantic-ui-react';
import { Form, AccountInput } from '../Elements';
import { accountPropType } from '../propTypes';

class CategoriesForm extends React.Component {
  static propTypes = {
    account: accountPropType,
    onCreate: PropTypes.func,
  }

  static defaultProps = {
    account: { id: null, name: '' },
    onCreate: () => {},
  }

  // eslint-disable-next-line react/destructuring-assignment
  state = { isCreate: !this.props.account.id, name: this.props.account.name, type: 'EXPENSE' }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, type } = this.state;
    const { onCreate } = this.props;
    onCreate({ variables: { input: { name, type } } });
  }

  render() {
    const { isCreate, name, type } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} {...this.props}>
        <Form.Field control={AccountInput} label="Name" name="name" value={name} onChange={this.handleChange} />
        <Form.Group>
          <Form.Field>
            <Radio label="Expense" name="type" value="EXPENSE" checked={type === 'EXPENSE'} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <Radio label="Income" name="type" value="INCOME" checked={type === 'INCOME'} onChange={this.handleChange} />
          </Form.Field>
        </Form.Group>
        {isCreate && <Button disabled={name.length === 0} type="submit">Save</Button>}
      </Form>
    );
  }
}

export default CategoriesForm;
