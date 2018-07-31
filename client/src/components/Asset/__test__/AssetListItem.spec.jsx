import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AssetListItem from '../AssetListItem';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

configure({ adapter: new Adapter() });

const asset = {
  id: '1',
  name: 'Bank Card',
};

describe('AssetListItem', () => {
  it('should render correctly', () => {
    const output = shallow(
      <AssetListItem asset={asset} />,
    );
    expect(output.debug()).toMatchSnapshot();
  });

  it('should render Link when run with router', () => {
    const output = mount( // COMBAK: Check link and do not render component
      <AssetListItem asset={asset} url="/home" />,
    );
    expect(output.debug()).toMatchSnapshot();
  });
});
