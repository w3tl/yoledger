import React from 'react';
import { configure, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import BudgetCell from '../BudgetCell';

configure({ adapter: new Adapter() });

describe('BudgetCell', () => {
  it('should render correctly', () => {
    const output = shallow(
      <BudgetCell amount={10} />,
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should handle the save button click', () => {
    const onUpdate = jest.fn();
    const output = shallow(
      <BudgetCell amount={10} onUpdate={onUpdate} />,
    );
    output.find('Button').simulate('click');
    expect(onUpdate).toHaveBeenCalledWith({ amount: 10 });
  });
});
