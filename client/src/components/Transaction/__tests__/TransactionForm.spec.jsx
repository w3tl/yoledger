import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TransactionForm from '../TransactionForm';
import transactions from '../mockData';

configure({ adapter: new Adapter() });

describe('TransactionForm', () => {
  it('should render correctly', () => {
    const output = shallow(
      <TransactionForm transaction={transactions[0]} />,
    );
    expect(output.state('isCreate')).toBeFalsy();
    expect(output.find('Button')).toHaveLength(2);
    expect(output).toMatchSnapshot();
  });

  it('should render delete button when transaction prop have\'t id field', () => {
    const output = shallow(
      <TransactionForm />,
    );
    expect(output.state('isCreate')).toBeTruthy();
    expect(output.find('Button')).toHaveLength(1);
  });

  it('should handle submit button click', () => {
    const transaction = transactions[0];
    const onSave = jest.fn();
    const output = mount(
      <TransactionForm
        transaction={transaction}
        onSave={onSave}
      />,
    );
    output.find('form').simulate('submit');
    expect(onSave.mock.calls[0]).toMatchSnapshot();
  });
});
