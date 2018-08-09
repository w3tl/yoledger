import React from 'react';
import { shallow } from 'enzyme';
import AssetList from '../AssetList';
import AssetListItem from '../AssetListItem';
import { testRenderWithoutError } from '../../testHelpers';
import assets from '../mockData';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('AssetList', () => {
  testRenderWithoutError(<AssetList assets={assets} />);

  it('should contain AssetListItem', () => {
    const output = shallow(
      <AssetList assets={assets} />,
    );
    expect(output.find(AssetListItem)).toHaveLength(assets.length);
  });
});
