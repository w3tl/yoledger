import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Button, Container, Segment,
} from 'semantic-ui-react';
import { assetPropType } from './propTypes';
import AssetsList from './AssetList';
import AssetForm from './AssetFormHOC';

const initialState = { activeItem: null };
const emptyAsset = {
  id: null,
  name: '',
  balance: 0,
};

class AssetPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    assets: PropTypes.arrayOf(assetPropType),
    initialState: PropTypes.shape({
      activeItem: PropTypes.string,
    }),
    formComponent: PropTypes.func,
  }

  static defaultProps = {
    loading: false, assets: [], formComponent: AssetForm, initialState,
  }

  state = {
    isAddMode: false, // eslint-disable-next-line react/destructuring-assignment
    ...this.props.initialState, // eslint-disable-next-line react/destructuring-assignment
    asset: this.props.assets.find(a => a.id === this.props.initialState.activeItem) || emptyAsset,
  }

  handleAddClick = () => this.setState(prevState => ({ isAddMode: !prevState.isAddMode }))

  handleClick = (id) => {
    const { assets } = this.props;
    const asset = assets.find(a => a.id === id) || emptyAsset;
    this.setState({ activeItem: id, asset });
  }

  handleCancel = () => this.setState({ activeItem: null })

  render() {
    const { loading, assets, formComponent: FormComp } = this.props;
    const { activeItem, asset } = this.state;
    if (loading) {
      return <Segment loading />;
    }
    const right = activeItem !== null
      ? <FormComp key={asset.id} asset={asset} onClose={this.handleCancel} />
      : (
        <Container textAlign="center">
          <Button onClick={() => this.handleClick('-1')} type="button">Add</Button>
        </Container>);

    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Column>
            <AssetsList active={activeItem} onClick={this.handleClick} assets={assets} />
          </Grid.Column>
          <Grid.Column>{right}</Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AssetPage;
