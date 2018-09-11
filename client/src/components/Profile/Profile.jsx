import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button } from '../Elements';

class Profile extends React.Component {
  static propTypes = {
    changePassword: PropTypes.func.isRequired,
  }

  state = {
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  }

  handleChange = name => ({ target }) => {
    this.setState({
      [name]: target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { changePassword } = this.props;
    const { oldPassword, newPassword } = this.state;
    changePassword({ oldPassword, newPassword });
  }

  render() {
    const { oldPassword, newPassword, repeatNewPassword } = this.state;
    const isNewPassword = oldPassword !== newPassword;
    const isRepeatCorrectly = newPassword.length && newPassword === repeatNewPassword;
    const isValid = isNewPassword && isRepeatCorrectly;
    return (
      <div>
        <h4>Change password</h4>
        <form onSubmit={this.handleSubmit}>
          <TextInput name="oldPassword" label="Old password" value={oldPassword} required type="password" onChange={this.handleChange('oldPassword')} />
          <TextInput
            required
            warning={!isNewPassword}
            message="New password should be unique"
            name="newPassword"
            label="New password"
            value={newPassword}
            type="password"
            onChange={this.handleChange('newPassword')}
          />
          <TextInput
            required
            warning={!isRepeatCorrectly}
            message="Repeat password correctly"
            name="repeatNewPassword"
            label="Repeat new password"
            value={repeatNewPassword}
            type="password"
            onChange={this.handleChange('repeatNewPassword')}
          />
          <Button type="submit" disabled={!isValid}>Change</Button>
        </form>
      </div>
    );
  }
}

export default Profile;
