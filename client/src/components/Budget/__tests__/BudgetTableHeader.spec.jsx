import React from 'react';
import { mount } from 'enzyme';
import { Table } from 'semantic-ui-react';
import RawBudgetTableHeader from '../BudgetTableHeader';

const periods = [new Date('2018-06-10'), new Date('2018-06-25'), new Date('2018-07-10')];

const BudgetTableHeader = props => (
  <Table>
    <RawBudgetTableHeader periods={periods} {...props} />
  </Table>
);

describe('BudgetTableHeader', () => {
  it('should call onPeriodChange when next or prev buttons was clicked', () => {
    const onPeriodChange = jest.fn();
    const output = mount(
      <BudgetTableHeader onPeriodChange={onPeriodChange} />,
    );

    output.find('Button[id="prevButton"]').simulate('click');
    expect(onPeriodChange.mock.calls[0]).toMatchSnapshot('prev click');
    output.find('Button[id="nextButton"]').simulate('click');
    expect(onPeriodChange.mock.calls[1]).toMatchSnapshot('next click');
  });
});
