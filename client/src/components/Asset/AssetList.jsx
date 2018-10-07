import React from 'react';
import PropTypes from 'prop-types';
import { List, Header, Icon } from 'semantic-ui-react';
import { assetPropType } from './propTypes';

class AssetList extends React.Component {
  static propTypes = {
    assets: PropTypes.arrayOf(assetPropType),
    onClick: PropTypes.func,
    active: PropTypes.string,
  }

  static defaultProps = {
    assets: [],
    onClick: () => {},
    active: '',
  }

  handleClick = idx => () => {
    const { onClick } = this.props;
    onClick(idx);
  }

  render() {
    const { assets, active } = this.props;
    return (
      <List divided relaxed selection verticalAlign="middle">
        {assets.length === 0 && (
          <Header as="h2" textAlign="center" disabled>Empty</Header>)}
        {assets.map(account => (
          <List.Item key={account.id} onClick={this.handleClick(account.id)}>
            {active === account.id && (
              <List.Content floated="right"><Icon name="angle right" /></List.Content>)}
            <List.Content>
              <List.Header>{account.name}</List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}

export default AssetList;
