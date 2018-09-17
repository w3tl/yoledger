/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import RawBudgetTable from '../BudgetTable';

const periods = [new Date('2018-06-10'), new Date('2018-06-25'), new Date('2018-07-10')];

jest.mock('../BudgetTableFooter', () => ({ onCreate }) => (
  <tbody>
    <tr>
      <td>
        <button id="addAccount" type="button" onClick={() => onCreate({ account: 'new account' })}>
          Add
        </button>
      </td>
    </tr>
  </tbody>
));

const Row = ({ account }) => (
  <tr>
    <td>{account.name}</td>
    {periods.map(period => <td key={period}>Cell</td>)}
  </tr>
);

const BudgetTable = props => (
  <RawBudgetTable row={Row} periods={periods} {...props} />
);

describe('BudgetTable', () => {
  test('should call onCreate with date', () => {
    const onCreate = jest.fn();
    const output = mount(
      <BudgetTable onCreate={onCreate} />,
    );
    output.find('#addAccount').simulate('click');
    expect(onCreate.mock.calls).toMatchSnapshot();
  });
});
