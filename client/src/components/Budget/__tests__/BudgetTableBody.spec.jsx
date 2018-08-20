import React from 'react';
import { mount } from 'enzyme';
import { BudgetTableBodyComponent } from '../BudgetTableBody';
import { stubDate, testRenderWithoutError } from '../../testHelpers';
import { periods, accounts } from '../mockData';

const BodyWithColumn = props => (
  <BudgetTableBodyComponent Component={({ date }) => <div>{date}</div>} {...props} />
);

describe('BudgetTableBody', () => {
  testRenderWithoutError(<BodyWithColumn accounts={accounts} />);

  it('should call onPeriodChange when next or prev buttons was clicked', () => {
    const onPeriodChange = jest.fn();
    const output = mount(<BodyWithColumn periods={periods} onPeriodChange={onPeriodChange} />);

    output.find('#prevButton').simulate('click');
    expect(onPeriodChange.mock.calls[0]).toMatchSnapshot('prev click');
    output.find('#nextButton').simulate('click');
    expect(onPeriodChange.mock.calls[1]).toMatchSnapshot('next click');
  });

  describe('should call onCreate when add budget for new account', () => {
    stubDate('2018-01-01');

    it('with the previous date from the first period', () => {
      const onCreate = jest.fn();
      const output = mount(
        <BodyWithColumn accounts={accounts} periods={periods} onCreate={onCreate} />,
      );

      output.find('AccountInput').simulate('change', { target: { value: 'new account' } });
      output.find('#add').simulate('click');
      expect(onCreate.mock.calls[0]).toMatchSnapshot();
    });

    it('do not add existing account', () => {
      const onCreate = jest.fn();
      const output = mount(
        <BodyWithColumn accounts={accounts} periods={periods} onCreate={onCreate} />,
      );

      output.find('AccountInput').simulate('change', { target: { value: accounts[0].name } });
      output.find('#add').simulate('click');
      expect(onCreate.mock.calls[0]).toMatchSnapshot();
    });

    it('with the previous date from the current', () => {
      const onCreate = jest.fn();
      const output = mount(
        <BodyWithColumn accounts={accounts} onCreate={onCreate} />,
      );

      output.find('AccountInput').simulate('change', { target: { value: 'new account' } });
      output.find('#add').simulate('click');
      expect(onCreate.mock.calls[0]).toMatchSnapshot();
    });
  });
});
