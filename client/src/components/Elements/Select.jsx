import React from 'react';
import PropTypes from 'prop-types';
import { withLabel } from './utils';

class Select extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })).isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: '',
    disabled: false,
    onChange: () => {},
  }

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  handleChange = (e) => {
    const { onChange } = this.props;
    this.setState({ value: e.target.value });
    onChange({ target: { value: e.target.value } });
  }

  render() {
    const { value } = this.state;
    const { disabled, options } = this.props;

    return (
      <select value={value} onChange={this.handleChange} disabled={disabled}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  }
}

export default withLabel(Select);
