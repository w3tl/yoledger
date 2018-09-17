import React from 'react';
import { mount } from 'enzyme';
import ListWithData from '../AssetListHOC';
import accounts from '../mockData';
import { wait, withProvider, testLoadingState } from '../../testHelpers';

const MockComponent = ({ assets }) => ( // eslint-disable-line react/prop-types
  <ul>{assets.map(asset => <li key={asset.id}>{asset.length}</li>)}</ul>
);

const ComponentWithData = ListWithData(MockComponent);
const ComponentWithProvider = withProvider(() => (
  <ComponentWithData />
));

describe('AssetListHOC', () => {
  testLoadingState(<ComponentWithProvider />);

  it('should have props', async () => {
    const wrapper = mount(<ComponentWithProvider />);
    await wait();
    wrapper.update();
    expect(wrapper.update().find('MockComponent').prop('assets')).toHaveLength(accounts.length);
  });
});
