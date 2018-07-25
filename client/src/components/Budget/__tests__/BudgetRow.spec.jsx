import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import BudgetRow from '../BudgetRow';

configure({ adapter: new Adapter() });

const accounts = [{
  name: 'Train',
}];

const budgets = [{
  id: '1',
  amount: 10,
  period: {
    dateStart: '2018-06-10',
  },
}, {
  id: '2',
  amount: 15,
  period: {
    dateStart: '2018-06-25',
  },
}, {
  id: '3',
  amount: 13,
  period: {
    dateStart: '2018-07-10',
  },
}];

describe('BudgetRow', () => {
  it('should render correctly', () => {
    const output = shallow(
      <BudgetRow
        account={accounts[0]}
        budgets={budgets}
        onUpdate={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should add an account and a period to the events', () => {
    const onUpdate = jest.fn();
    const onDelete = jest.fn();
    const output = mount(
      <table>
        <tbody>
          <BudgetRow
            account={accounts[0]}
            budgets={budgets}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </tbody>
      </table>,
    );

    output.find('Button').first().simulate('click');
    expect(onUpdate).toHaveBeenCalledWith({
      account: accounts[0],
      period: budgets[0].period,
      amount: 10,
    });
  });
});
