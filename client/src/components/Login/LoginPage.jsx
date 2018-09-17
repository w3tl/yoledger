import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Form } from '../Elements';

const initialState = { username: '', password: '' };

class LoginPage extends React.Component {
  static propTypes = {
    signin: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.object, // eslint-disable-line
    initialState: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
    }),
  }

  static defaultProps = { loading: false, initialState }

  // eslint-disable-next-line react/destructuring-assignment
  state = { ...initialState, ...this.props.initialState }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { signin } = this.props;
    const { username, password } = this.state;
    signin({ variables: { login: username, password } });
  }

  render() {
    // TODO: check if loggedin
    const { username, password } = this.state;
    const isValid = username.length > 0 && password.length > 0;
    return (
      <Form onSubmit={this.handleSubmit} {...this.props}>
        <Form.Input
          label="Username"
          name="username"
          value={username}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Password"
          name="password"
          value={password}
          type="password"
          onChange={this.handleChange}
        />
        <Button disabled={!isValid} type="submit">Sign in</Button>
      </Form>
    );
  }
}

export default LoginPage;
