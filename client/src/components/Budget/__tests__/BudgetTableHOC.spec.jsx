/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import RawBudgetTable from '../BudgetTable';
import HOC, { updateAfterCreate } from '../BudgetTableHOC';
import { accounts, budgets } from '../mockData';
import { withProvider, testLoadingState } from '../../testHelpers';

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
const periods = [new Date('2018-06-10'), new Date('2018-06-25'), new Date('2018-07-10')];

const Row = ({ account, periods: cols }) => (
  <tr>
    <td>{account.name}</td>
    {cols.map(period => <td key={period}>Cell</td>)}
  </tr>
);

jest.mock('../BudgetTableFooter', () => ({ onCreate }) => (
  <tbody>
    <tr>
      <td>
        <button
          id="addAccount"
          type="button"
          onClick={() => onCreate({ account: 'new account' })}
        >
          Add
        </button>
      </td>
    </tr>
  </tbody>
));

const TableWithData = HOC(RawBudgetTable);

const variables = {
  dateStart: periods[0].toISOString(),
  dateEnd: periods[periods.length - 1].toISOString(),
};

const BudgetTable = withProvider(() => (
  <TableWithData
    row={Row}
    periods={periods}
    {...variables}
  />
));

describe('BudgetTableHOC', () => {
  testLoadingState(<BudgetTable />);

  describe('updateAfterCreate', () => {
    it('should add new account', () => {
      const writeQuery = jest.fn();
      const cache = {
        readQuery: jest.fn().mockReturnValue({
          budgets: {
            accounts: [accounts[0]],
          },
        }),
        writeQuery,
      };
      const newAccount = { id: 'new', name: 'New account' };
      const data = { upsertBudget: { budget: { ...budgets[0], account: newAccount } } };
      updateAfterCreate(variables)(cache, { data });
      expect(cache.readQuery.mock.calls[0][0].variables).toMatchSnapshot('readQuery');
      expect(writeQuery.mock.calls[0][0].data).toMatchSnapshot('writeQuery');
    });
  });

  it('should have props', async () => {
    const wrapper = mount(<BudgetTable />);
    await wait();
    wrapper.update();
    const table = wrapper.find('BudgetTable').first();
    expect(table.prop('accounts')).toHaveLength(accounts.length);
    expect(table.prop('periods')).toHaveLength(periods.length);
    expect(table.prop('onCreate')).toBeDefined();
  });
});
