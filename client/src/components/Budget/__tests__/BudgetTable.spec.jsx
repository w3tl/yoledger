import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BudgetTable from '../BudgetTable';

configure({ adapter: new Adapter() });

const periods = [{
  dateStart: '2018-06-10',
}, {
  dateStart: '2018-06-25',
}, {
  dateStart: '2018-07-10',
}];

describe('BudgetTable', () => {
  it('should render correctly', () => {
    const output = shallow(
      <BudgetTable
        periods={periods}
        onChange={() => {}}
      >
        Rows
      </BudgetTable>,
    );
    expect(output).toMatchSnapshot();
  });

  it('should handle next button click', () => {
    const onChange = jest.fn();
    const output = shallow(
      <BudgetTable
        periods={periods}
        onChange={onChange}
      >
        Rows
      </BudgetTable>,
    );

    output.find('Button').first().simulate('click');
    expect(onChange).toHaveBeenCalled();
  });
});
