import React from 'react';
import { shallow } from 'enzyme';
import BudgetTable from '../BudgetTable';
import { testRenderWithoutError } from '../../testHelpers';

jest.mock('../BudgetTableBody', () => Component => (
  <Component />
));

jest.mock('../BudgetTableHeader', () => Component => (
  <Component />
));

describe('BudgetTable', () => {
  const fixedDate = new Date('2018-06-10');
  let originalDate;

  beforeAll(() => {
    originalDate = global.Date;

    global.Date = class extends Date {
      constructor() {
        super();
        return fixedDate;
      }
    };
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  testRenderWithoutError(<BudgetTable />);

  it('state should contain dateStart with current date and  default count', () => {
    const output = shallow(
      <BudgetTable />,
    );
    const date = new Date(output.state('dateStart'));
    expect(date.getTime()).toBe(fixedDate.getTime());
    expect(output.state('count')).toBeDefined();
  });

  // it('should change state when after handleNextClick', () => {
  //   const output = mount(
  //     <BudgetTable />,
  //   );
  //
  //   output.find('#nextButton').simulate('click');
  //   const nextDate = new Date(output.state('dateStart'));
  //   expect(nextDate.getTime()).toBe(new Date(periods[1]).getTime());
  // });
});
