import React from 'react';
import { mount } from 'enzyme';
import ListWithData from '../IncomeListHOC';
import accounts from '../mockData';
import { wait, withProvider, testLoadingState } from '../../testHelpers';

const MockComponent = ({ incomes }) => ( // eslint-disable-line react/prop-types
  <ul>{incomes.map(account => <li key={account.id}>{account.length}</li>)}</ul>
);

const ComponentWithData = ListWithData(MockComponent);
const ComponentWithProvider = withProvider(() => (
  <ComponentWithData />
));

describe('IncomeListHOC', () => {
  testLoadingState(<ComponentWithProvider />);

  it('should have props', async () => {
    const wrapper = mount(<ComponentWithProvider />);
    await wait();
    wrapper.update();
    expect(wrapper.update().find('MockComponent').prop('incomes')).toHaveLength(accounts.length);
  });
});
