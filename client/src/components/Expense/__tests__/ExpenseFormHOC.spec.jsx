/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import { LIST_QUERY } from '../queries';
import formWithData from '../ExpenseFormHOC';
import RawExpenseForm from '../ExpenseForm';
import {
  wait, withProvider, testLoadingState, client,
} from '../../testHelpers';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Redirect: ({ to }) => <a href={to}>Redirect</a>,
}));

const ExpenseForm = formWithData(RawExpenseForm);
const ExpenseWithoutLocationState = withProvider((props) => {
  props.client.writeQuery({
    query: LIST_QUERY,
    variables: { type: 'EXPENSE' },
    data: { accounts: [] },
  });
  return <ExpenseForm />;
});
const ExpenseWithLocationState = withProvider(() => (
  <ExpenseForm location={{ state: { id: '21' } }} />
));

describe('ExpenseFormHOC', () => {
  describe('with router id params', () => {
    testLoadingState(<ExpenseWithLocationState />);

    it('should contain props', async () => {
      const wrapper = mount(<ExpenseWithLocationState />);
      await wait();
      wrapper.update();
      const form = wrapper.find('ExpenseForm');
      expect(form.prop('expense').id).toBeDefined();
      expect(form.prop('onSave')).toBeDefined();
    });
  });

  describe('without router id params', () => {
    it('should successfully add expense', async () => {
      const wrapper = mount(<ExpenseWithoutLocationState />);
      await wait();
      wrapper.update();
      wrapper.find('input').simulate('change', { target: { value: 'new expense' } });
      wrapper.find('form').simulate('submit');
      await wait(1);
      wrapper.update();
      expect(wrapper.find('Redirect').prop('to')).toBeDefined();
      const { accounts } = client.readQuery({
        query: LIST_QUERY,
        variables: { type: 'EXPENSE' },
      });
      expect(accounts).toHaveLength(1);
    });
  });
});
