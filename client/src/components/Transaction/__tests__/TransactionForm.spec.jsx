import React from 'react';
import { shallow, mount } from 'enzyme';
import TransactionForm from '../TransactionForm';
import transactions from '../mockData';
import { testRenderWithoutError } from '../../testHelpers/index';

describe('TransactionForm', () => {
  testRenderWithoutError(<TransactionForm transaction={transactions[0]} />);

  it('should contain props', () => {
    const output = shallow(
      <TransactionForm transaction={transactions[0]} />,
    );
    expect(output.state('isCreate')).toBeFalsy();
    expect(output.find('Button')).toHaveLength(2);
  });

  it('should render delete button when transaction prop have\'t id field', () => {
    const output = shallow(
      <TransactionForm />,
    );
    expect(output.state('isCreate')).toBeTruthy();
    expect(output.find('Button')).toHaveLength(0);
    // input fields
    output.find('[label="From"]').simulate('change', { target: { value: 'Cash' } });
    output.find('[label="To"]').simulate('change', { target: { value: 'Food' } });
    expect(output.find('Button')).toHaveLength(1);
  });

  it('should call onSave on submit click when edit transaction', () => {
    const transaction = transactions[0];
    const onSave = jest.fn();
    const output = mount(
      <TransactionForm transaction={transaction} onSave={onSave} />,
    );
    output.find('form').simulate('submit');
    expect(onSave.mock.calls[0]).toMatchSnapshot('Update');
  });

  it('should call onCreate on submit click when create new transaction', () => {
    const onCreate = jest.fn();
    const createOutput = mount(<TransactionForm onCreate={onCreate} />);
    createOutput.find('#from').simulate('change', { target: { value: 'Cash' } });
    createOutput.find('#to').simulate('change', { target: { value: 'Food' } });
    createOutput.find('form').simulate('submit');
    expect({ ...onCreate.mock.calls[0][0], date: null }).toMatchSnapshot('Create');
  });
});
