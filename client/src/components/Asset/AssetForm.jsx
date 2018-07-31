import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button } from '../Elements';
import AmountInput from '../AmountInput';
import { assetPropType } from './propTypes';

class AssetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.asset.name,
      balance: props.asset.balance,
    };
  }

  handleChange = name => ({ target }) => {
    this.setState({
      [name]: target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, balance } = this.state;
    const { onSave } = this.props;
    onSave({
      name,
      balance,
    });
  }

  render() {
    const { balance, name } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput label="Name" value={name} onChange={this.handleChange('name')} />
        <AmountInput label="Balance" value={balance} onChange={this.handleChange('balance')} />
        <Button type="submit">
          Save
        </Button>
      </form>
    );
  }
}

AssetForm.propTypes = {
  asset: assetPropType,
  onSave: PropTypes.func,
};
AssetForm.defaultProps = {
  asset: {
    id: null,
    name: '',
    balance: 0,
  },
  onSave: () => {},
};

export default AssetForm;
