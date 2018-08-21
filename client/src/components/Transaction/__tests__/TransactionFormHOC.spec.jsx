import React from 'react';
import { mount } from 'enzyme';
import { QUERY as LIST_QUERY } from '../TransactionListHOC';
import formWithData from '../TransactionFormHOC';
import TransactionForm from '../TransactionForm';
import transactionsData from '../mockData';
import {
  wait, withProvider, testLoadingState, client,
} from '../../testHelpers/index';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Redirect: ({ to }) => <a href={to}>Redirect</a>,
}));

const usedTransaction = transactionsData[0];

const ComponentWithData = formWithData(TransactionForm);
const ComponentWithoutLocationState = withProvider((props) => {
  props.client.writeQuery({
    query: LIST_QUERY,
    variables: { dateStart: new Date('2018-01-01').toISOString() },
    data: { transactions: [] },
  });
  return <ComponentWithData />;
});
const ComponentWithLocationState = withProvider((props) => {
  props.client.writeQuery({
    query: LIST_QUERY,
    variables: { dateStart: new Date('2018-01-01').toISOString() },
    data: { transactions: [usedTransaction] },
  });
  return <ComponentWithData location={{ state: { id: usedTransaction.id } }} />;
});

describe('TransactionFormHOC', () => {
  describe('with router id params', () => {
    testLoadingState(<ComponentWithLocationState />);

    it('should contain props', async () => {
      const wrapper = mount(<ComponentWithLocationState />);
      await wait();
      wrapper.update();
      expect(wrapper.find('TransactionForm').prop('transaction').id).toEqual(usedTransaction.id);
      expect(wrapper.find('TransactionForm').prop('onSave')).toBeDefined();
      expect(wrapper.find('TransactionForm').prop('onDelete')).toBeDefined();
    });

    it('should successfully delete transaction', async () => {
      client.writeQuery({
        query: LIST_QUERY,
        variables: { dateStart: new Date('2018-01-01').toISOString() },
        data: { transactions: [usedTransaction] },
      });
      const wrapper = mount(<ComponentWithLocationState />);
      await wait();
      wrapper.update();
      wrapper.find('#delete').simulate('click');
      await wait(10);
      wrapper.update();
      expect(wrapper.find('Redirect').prop('to')).toBeDefined();
      const { transactions } = client.readQuery({
        query: LIST_QUERY,
        variables: { dateStart: new Date('2018-01-01').toISOString() },
      });
      expect(transactions).toHaveLength(0);
    });

    it('should successfully update transaction', async () => {
      const wrapper = mount(<ComponentWithLocationState />);
      await wait();
      wrapper.update();
      wrapper.find('#from').simulate('change', { target: { value: 'Bank Card' } });
      wrapper.find('form').simulate('submit');
      await wait(1);
      wrapper.update();
      expect(wrapper.find('Redirect').prop('to')).toBeDefined();
      const { transactions } = client.readQuery({
        query: LIST_QUERY,
        variables: { dateStart: new Date('2018-01-01').toISOString() },
      });
      expect(transactions[0].id).not.toBe(usedTransaction.id);
    });
  });

  describe('without router id params', () => {
    it('should successfully add transaction', async () => {
      const wrapper = mount(<ComponentWithoutLocationState />);
      await wait();
      wrapper.update();
      wrapper.find('#from').simulate('change', { target: { value: 'Cash' } });
      wrapper.find('#to').simulate('change', { target: { value: 'Food' } });
      wrapper.find('form').simulate('submit');
      await wait(1);
      wrapper.update();
      expect(wrapper.find('Redirect').prop('to')).toBeDefined();
      const { transactions } = client.readQuery({
        query: LIST_QUERY,
        variables: { dateStart: new Date('2018-01-01').toISOString() },
      });
      expect(transactions).toHaveLength(1);
    });
  });
});
