import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Loader } from 'semantic-ui-react';
import { accountPropType } from '../propTypes';
import { AccountInput } from '../Elements';

const initialState = { isAddAccount: false, newAccount: '' };

class BudgetTable extends React.Component {
  static propTypes = {
    accounts: PropTypes.arrayOf(accountPropType),
    length: PropTypes.number,
    onCreate: PropTypes.func,
    loading: PropTypes.bool,
    initialState: PropTypes.shape({
      isAddAccount: PropTypes.bool,
      newAccount: PropTypes.string,
    }),
  }

  static defaultProps = {
    accounts: [],
    length: 0,
    onCreate: () => {},
    loading: false,
    initialState,
  }

  // eslint-disable-next-line react/destructuring-assignment
  state = { ...initialState, ...this.props.initialState }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleAdd = () => {
    const { isAddAccount, newAccount } = this.state;

    if (isAddAccount) {
      const { onCreate } = this.props;
      onCreate({ account: newAccount });
    }
    this.setState({ isAddAccount: !isAddAccount });
  }

  handleCancelAdd = () => {
    this.setState({ isAddAccount: false });
  }

  render() {
    const { newAccount = '', isAddAccount } = this.state;
    const { accounts, length, loading } = this.props;
    const canAdd = newAccount.length > 0 && !accounts.find(({ name }) => name === newAccount);

    return (
      <Table.Footer>
        <Table.Row>
          {loading && (
            <Table.HeaderCell colSpan={length + 1}>
              <Loader active inline="centered" size="small" />
            </Table.HeaderCell>
          )}
          {!loading && (
            <React.Fragment>
              <Table.HeaderCell>
                {isAddAccount && (
                  <AccountInput
                    name="newAccount"
                    fluid
                    value={newAccount}
                    onChange={this.handleChange}
                  />)}
                {!isAddAccount && (
                  <Button primary content="Add" onClick={this.handleAdd} />
                )}
              </Table.HeaderCell>
              <Table.HeaderCell colSpan={length}>
                {isAddAccount && (
                  <React.Fragment>
                    <Button content="Cancel" onClick={this.handleCancelAdd} />
                    <Button id="addAccount" disabled={!canAdd} primary content="Add" onClick={this.handleAdd} />
                  </React.Fragment>
                )}
              </Table.HeaderCell>
            </React.Fragment>)}
        </Table.Row>
      </Table.Footer>
    );
  }
}

export default BudgetTable;
