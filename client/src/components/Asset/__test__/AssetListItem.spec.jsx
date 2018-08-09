import React from 'react';
import { mount } from 'enzyme';
import AssetListItem from '../AssetListItem';
import { testRenderWithoutError } from '../../testHelpers';
import assets from '../mockData';

const asset = assets[0];

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('AssetListItem', () => {
  testRenderWithoutError(<AssetListItem asset={asset} />);

  it('should render Link when run with router', () => {
    const output = mount( // COMBAK: Check link and do not render component
      <AssetListItem asset={asset} url="/home" />,
    );
    expect(output.debug()).toMatchSnapshot();
  });
});
