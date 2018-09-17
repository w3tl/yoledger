import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react';
import { AmountInput, Form } from '../Elements';
import { assetPropType } from './propTypes';

class AssetForm extends React.Component {
  static propTypes = {
    asset: assetPropType,
    onSave: PropTypes.func,
  }

  static defaultProps = {
    asset: { id: null, name: '', balance: 0 },
    onSave: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      isCreate: !props.asset.id,
      name: props.asset.name,
      balance: props.asset.balance,
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, balance } = this.state;
    const { onSave } = this.props;
    onSave({ variables: { input: { name, balance, type: 'ASSET' } } });
  }

  render() {
    const { isCreate, balance, name } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} {...this.props}>
        <Form.Field control={Input} label="Name" name="name" value={name} onChange={this.handleChange} />
        <Form.Field control={AmountInput} label="Balance" name="balance" value={balance} onChange={this.handleChange} />
        <Button disabled={name.length === 0 || !isCreate} type="submit">Save</Button>
      </Form>
    );
  }
}

export default AssetForm;
