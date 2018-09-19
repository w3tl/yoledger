import React from 'react';
import { mount } from 'enzyme';
import RawAssetPage from '../AssetPageHOC';
import assets from '../mockData';
import { wait, withProvider, testLoadingState } from '../../testHelpers';

const AssetPage = withProvider(() => (
  <RawAssetPage />
));

describe('AssetPageHOC', () => {
  testLoadingState(<AssetPage />);

  it('should have props', async () => {
    const wrapper = mount(<AssetPage />);
    await wait();
    wrapper.update();
    expect(wrapper.update().find('AssetPage').prop('assets')).toHaveLength(assets.length);
  });
});
