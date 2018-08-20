import React from 'react';
import { shallow } from 'enzyme';
import BudgetTable from '../BudgetTable';
import { BudgetTableBodyComponent } from '../BudgetTableBody';
import { stubDate, testRenderWithoutError } from '../../testHelpers';

const fixedDate = new Date('2018-06-10');
describe('BudgetTable', () => {
  stubDate(fixedDate);

  testRenderWithoutError(
    <BudgetTable body={BudgetTableBodyComponent} />,
  );

  it('state should contain dateStart with current date and  default count', () => {
    const output = shallow(
      <BudgetTable body={BudgetTableBodyComponent} />,
    );
    const date = new Date(output.state('dateStart'));
    expect(date.getTime() < fixedDate.getTime()).toBeTruthy();
    expect(output.state('count')).toBeDefined();
  });
});
