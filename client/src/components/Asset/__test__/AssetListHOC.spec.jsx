import React from 'react';
import { mount } from 'enzyme';
import ListWithData, { QUERY } from '../AssetListHOC';
import accounts from '../mockData';
import {
  withProvider, testLoadingState, testErrorUI,
} from '../../testHelpers';

const MockComponent = ({ assets }) => ( // eslint-disable-line react/prop-types
  <ul>{assets.map(asset => <li key={asset.id}>{asset.length}</li>)}</ul>
);

const ComponentWithData = ListWithData(MockComponent);
const ComponentWithProvider = withProvider(() => (
  <ComponentWithData />
));

const queryRequest = {
  request: {
    query: QUERY,
  },
  result: {
    data: { accounts },
  },
};

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

describe('AssetListHOC', () => {
  const mocks = [queryRequest];
  const errorMocks = [{ ...queryRequest, error: new Error('awwh') }];
  testLoadingState(<ComponentWithProvider mocks={[]} />);
  testErrorUI(<ComponentWithProvider mocks={errorMocks} />);

  it('should have props', async () => {
    const wrapper = mount(<ComponentWithProvider mocks={mocks} />);
    await wait();
    wrapper.update();
    expect(wrapper.update().find('MockComponent').prop('assets')).toHaveLength(3);
  });
});
