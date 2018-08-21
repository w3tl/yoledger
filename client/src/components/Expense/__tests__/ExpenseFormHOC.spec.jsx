/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import { QUERY as LIST_QUERY } from '../ExpenseListHOC';
import formWithData from '../ExpenseFormHOC';
import ExpenseForm from '../ExpenseForm';
import {
  wait, withProvider, testLoadingState, client,
} from '../../testHelpers/index';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Redirect: ({ to }) => <a href={to}>Redirect</a>,
}));

const ComponentWithData = formWithData(ExpenseForm);
const ComponentWithoutLocationState = withProvider((props) => {
  props.client.writeQuery({
    query: LIST_QUERY,
    variables: { type: 'EXPENSE' },
    data: { accounts: [] },
  });
  return <ComponentWithData />;
});
const ComponentWithLocationState = withProvider(() => (
  <ComponentWithData location={{ state: { id: '21' } }} />
));

describe('ExpenseFormHOC', () => {
  describe('with router id params', () => {
    testLoadingState(<ComponentWithLocationState />);

    it('should contain props', async () => {
      const wrapper = mount(<ComponentWithLocationState />);
      await wait();
      wrapper.update();
      const form = wrapper.find('ExpenseForm');
      expect(form.prop('expense').id).toBeDefined();
      expect(form.prop('onSave')).toBeDefined();
    });
  });

  describe('without router id params', () => {
    // NOTE: skip query without id in location
    // testLoadingState(<ComponentWithLocationState />);

    it('should successfully add expense', async () => {
      const wrapper = mount(<ComponentWithoutLocationState />);
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
