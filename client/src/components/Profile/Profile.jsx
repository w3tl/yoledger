import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Form } from '../Elements';

const initialState = { oldPassword: '', newPassword: '', repeatNewPassword: '' };

class Profile extends React.Component {
  static propTypes = {
    changePassword: PropTypes.func.isRequired,
    initialState: PropTypes.shape({
      oldPassword: PropTypes.string,
      newPassword: PropTypes.string,
      repeatNewPassword: PropTypes.string,
    }),
  }

  static defaultProps = { initialState }

  // eslint-disable-next-line react/destructuring-assignment
  state = { ...initialState, ...this.props.initialState }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { changePassword } = this.props;
    const { oldPassword, newPassword } = this.state;
    changePassword({ variables: { oldPassword, newPassword } });
  }

  render() {
    const { oldPassword, newPassword, repeatNewPassword } = this.state;
    const isNewPassword = oldPassword !== newPassword;
    const isRepeatCorrectly = newPassword.length && newPassword === repeatNewPassword;
    const isValid = isNewPassword && isRepeatCorrectly;

    return (
      <div>
        <h4>Change password</h4>
        <Form onSubmit={this.handleSubmit} {...this.props}>
          <Form.Input
            name="oldPassword"
            label="Old password"
            required
            value={oldPassword}
            type="password"
            onChange={this.handleChange}
          />
          <Form.Input
            name="newPassword"
            label="New password"
            required
            value={newPassword}
            type="password"
            onChange={this.handleChange}
            error={!isNewPassword && oldPassword.length > 0}
          />
          <Form.Input
            name="repeatNewPassword"
            label="Repeat new password"
            required
            value={repeatNewPassword}
            type="password"
            onChange={this.handleChange}
            error={!isRepeatCorrectly && newPassword.length > 0}
          />
          <Button type="submit" disabled={!isValid}>Change</Button>
        </Form>
      </div>
    );
  }
}

export default Profile;
