import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AssetList from '../AssetList';
import AssetListItem from '../AssetListItem';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

configure({ adapter: new Adapter() });

const assets = [{
  id: '1',
  name: 'Bank Card',
}, {
  id: '2',
  name: 'Cash',
}, {
  id: '3',
  name: 'Bank Card 2',
}];

describe('AssetList', () => {
  it('should render correctly', () => {
    const output = shallow(
      <AssetList assets={assets} />,
    );
    expect(output.debug()).toMatchSnapshot();
    expect(output.find(AssetListItem)).toHaveLength(assets.length);
  });
});
