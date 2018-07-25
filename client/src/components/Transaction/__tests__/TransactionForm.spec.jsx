import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import TransactionForm from '../TransactionForm';

configure({ adapter: new Adapter() });

const dateString = new Date('2018-01-01').toISOString();

describe('TransactionForm', () => {
  it('should render correctly', () => {
    const output = shallow(
      <TransactionForm
        date={dateString}
        onSave={() => {}}
      />,
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should handle submit button click', () => {
    const onSave = jest.fn();
    const output = mount(
      <TransactionForm
        amount={10}
        source={{ name: 'from' }}
        destination={{ name: 'to' }}
        date={dateString}
        onSave={onSave}
      />,
    );
    output.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalledWith({
      amount: 10,
      source: 'from',
      destination: 'to',
      date: dateString,
    });
  });
});
