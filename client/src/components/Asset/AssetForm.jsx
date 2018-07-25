import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button } from '../Elements';
import AmountInput from '../AmountInput';

class AssetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      balance: props.balance,
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
    onSave({ name, balance });
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
  name: PropTypes.string,
  balance: PropTypes.number,
  onSave: PropTypes.func.isRequired,
};
AssetForm.defaultProps = {
  name: '',
  balance: 0,
};

export default AssetForm;
