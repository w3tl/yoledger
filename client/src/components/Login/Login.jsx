import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button } from '../Elements';

class Login extends React.Component {
  static propTypes = {
    signin: PropTypes.func.isRequired,
  }

  state = {
    username: '',
    password: '',
  }

  handleChange = name => ({ target }) => {
    this.setState({
      [name]: target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { signin } = this.props;
    const { username, password } = this.state;
    signin({ username, password });
  }

  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput name="username" label="Username" value={username} required type="text" onChange={this.handleChange('username')} />
        <TextInput name="password" label="Password" value={password} required type="password" onChange={this.handleChange('password')} />
        <Button type="submit">Signin</Button>
      </form>
    );
  }
}

export default Login;
