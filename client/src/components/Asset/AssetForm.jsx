import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'semantic-ui-react';
import { AmountInput, Form } from '../Elements';
import { assetPropType } from './propTypes';

class AssetForm extends React.Component {
  static propTypes = {
    asset: assetPropType,
    onCreate: PropTypes.func,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    asset: { id: null, name: '', balance: 0 },
    onCreate: () => {},
    onClose: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      isCreate: !props.asset.id,
      ...props.asset,
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, balance } = this.state;
    const { onCreate } = this.props;
    onCreate({ variables: { input: { name, balance, type: 'ASSET' } } });
  }

  render() {
    const { isCreate, balance, name } = this.state;
    const { onClose } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} {...this.props}>
        <Form.Field control={Input} label="Name" name="name" value={name} onChange={this.handleChange} />
        <Form.Field control={AmountInput} label="Balance" name="balance" value={balance} onChange={this.handleChange} />
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={name.length === 0 || !isCreate} type="submit">Save</Button>
      </Form>
    );
  }
}

export default AssetForm;
