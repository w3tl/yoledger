/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import RawBudgetTableRow, { updateAfterUpsert } from '../BudgetTableRowHOC';
import { accounts, budgets } from '../mockData';
import { wait, withProvider, testLoadingState } from '../../testHelpers';

const periods = [new Date('2018-06-10'), new Date('2018-06-25'), new Date('2018-07-10')];

jest.mock('../BudgetTableCell', () => ({ onUpdate, amount }) => (
  <td>
    <input name="amount" value={amount} onChange={() => {}} />
    <button name="updateAmount" type="button" onClick={() => onUpdate({ amount: 43 })} />
  </td>
));

const variables = {
  account: accounts[0],
  dateStart: periods[0].toISOString(),
  dateEnd: periods[periods.length - 1].toISOString(),
};

const BudgetTableRow = withProvider(props => (
  <table>
    <tbody>
      <RawBudgetTableRow periods={periods} {...variables} {...props} />
    </tbody>
  </table>
));

describe('BudgetTableRowHOC', () => {
  testLoadingState(<BudgetTableRow />);

  describe('updateAfterUpsert', () => {
    it('should append new budget', () => {
      const writeQuery = jest.fn();
      const cache = {
        readQuery: jest.fn().mockReturnValue({ budget: [budgets[0]] }),
        writeQuery,
      };
      const data = { upsertBudget: { budget: { ...budgets[0], id: 'new' } } };
      updateAfterUpsert(variables)(cache, { data });
      expect(cache.readQuery.mock.calls[0][0].variables).toMatchSnapshot('readQuery');
      expect(writeQuery.mock.calls[0][0].data).toMatchSnapshot('writeQuery');
    });

    it('should write existing budget array if budget found', () => {
      const writeQuery = jest.fn();
      const cache = {
        readQuery: jest.fn().mockReturnValue({ budget: [budgets[0]] }),
        writeQuery,
      };
      const data = { upsertBudget: { budget: budgets[0] } };
      updateAfterUpsert(variables)(cache, { data });
      expect(cache.readQuery.mock.calls[0][0].vaariables).toMatchSnapshot('readQuery');
      expect(writeQuery.mock.calls[0][0].data).toMatchSnapshot('writeQuery');
    });
  });

  it('should have props', async () => {
    const wrapper = mount(<BudgetTableRow />);
    await wait(1000);
    wrapper.update();
    expect(wrapper.find('BudgetTableRow').prop('account')).toBeDefined();
    expect(wrapper.find('BudgetTableRow').prop('budget').length).toBeGreaterThan(0);
  });
});
