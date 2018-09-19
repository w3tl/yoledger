import React from 'react';
import { mount } from 'enzyme';
import { LIST_QUERY } from '../queries';
import TransactionForm, {
  updateAfterAdd, updateAfterUpdate, updateAfterDelete,
} from '../TransactionFormHOC';
import transactionsData from '../mockData';
import {
  wait, withProvider, client,
} from '../../testHelpers/index';

const usedTransaction = transactionsData[0];
const date = new Date('2018-01-01');

const FormCreateNew = withProvider(props => <TransactionForm dateStart={date} {...props} />);
const FormEdit = withProvider(props => (
  <TransactionForm dateStart={date.toISOString()} transaction={usedTransaction} {...props} />));


describe('TransactionFormHOC', () => {
  describe('mutation update', () => {
    it('updateAfterAdd should add transaction into list', () => {
      const writeQuery = jest.fn();
      const props = { dateStart: '2018-06-10', dateEnd: '2018-06-10' };
      const cache = {
        readQuery: () => ({ transactions: [{ id: '1' }] }),
        writeQuery,
      };
      const data = { addTransaction: { transaction: { id: 'new' } } };
      updateAfterAdd(props)(cache, { data });
      expect(writeQuery.mock.calls[0][0].data).toMatchSnapshot();
    });

    it('updateAfterDelete should delete transaction from list', () => {
      const writeQuery = jest.fn();
      const props = { dateStart: '2018-06-10', dateEnd: '2018-06-10' };
      const cache = {
        readQuery: () => ({ transactions: [{ id: '1' }] }),
        writeQuery,
      };
      const data = { deleteTransaction: { success: true, id: '1' } };
      updateAfterDelete(props)(cache, { data });
      expect(writeQuery.mock.calls[0][0].data).toMatchSnapshot();
    });

    it('updateAfterUpdate should replace transaction with new id', () => {
      const writeQuery = jest.fn();
      const props = { transaction: { id: '1' }, dateStart: '2018-06-10', dateEnd: '2018-06-10' };
      const cache = {
        readQuery: () => ({ transactions: [{ id: '1' }] }),
        writeQuery,
      };
      const data = { updateTransaction: { success: true, transaction: { id: 'new' } } };
      updateAfterUpdate(props)(cache, { data });
      expect(writeQuery.mock.calls[0][0].data).toMatchSnapshot();
    });
  });

  client.writeQuery({
    query: LIST_QUERY,
    variables: { dateStart: date.toISOString() },
    data: { transactions: [] },
  });

  describe('edit mode', () => {
    beforeEach(() => {
      client.writeQuery({
        query: LIST_QUERY,
        variables: { dateStart: date.toISOString() },
        data: { transactions: [usedTransaction] },
      });
    });

    it('should contain props', async () => {
      const wrapper = mount(<FormEdit />);
      await wait();
      wrapper.update();
      expect(wrapper.find('TransactionForm').prop('transaction').id).toEqual(usedTransaction.id);
    });

    it('should successfully delete transaction', async () => {
      const onClose = jest.fn();
      const wrapper = mount(<FormEdit onClose={onClose} />);
      await wait();
      wrapper.update();
      wrapper.find('Button[id="delete"]').simulate('click');
      await wait(1);
      wrapper.update();
      expect(onClose).toHaveBeenCalled();
      const { transactions } = client.readQuery({
        query: LIST_QUERY,
        variables: { dateStart: date.toISOString() },
      });
      expect(transactions).toHaveLength(0);
    });

    it('should successfully update transaction', async () => {
      const onClose = jest.fn();
      const wrapper = mount(<FormEdit onClose={onClose} />);
      await wait();
      wrapper.update();
      wrapper.find('AccountInput[name="source"]').simulate('change', { target: { value: 'Bank Card' } });
      wrapper.find('form').simulate('submit');
      await wait(1);
      wrapper.update();
      expect(onClose).toHaveBeenCalled();
      const { transactions } = client.readQuery({
        query: LIST_QUERY,
        variables: { dateStart: date.toISOString() },
      });
      expect(transactions[0].id).not.toBe(usedTransaction.id);
    });
  });

  describe('create new mode', () => {
    beforeEach(() => {
      client.writeQuery({
        query: LIST_QUERY,
        variables: { dateStart: date.toISOString() },
        data: { transactions: [] },
      });
    });

    it('should successfully add transaction', async () => {
      const transaction = {
        amount: 4,
        source: { name: 'Cash' },
        destination: { name: 'Food' },
        date: '2018-02-01',
      };
      const wrapper = mount(<FormCreateNew transaction={transaction} />);
      await wait();
      wrapper.update();
      const form = wrapper.find('form');
      form.find('input[name="source"]').simulate('change', { target: { value: 'Cash' } }, { name: 'source', value: 'Cash' });
      form.find('input[name="destination"]').simulate('change', { target: { value: 'Food' } }, { name: 'destination', value: 'Food' });
      form.find('DateInput').first().simulate('change', { target: { value: '2018-01-02' } }, { name: 'date', value: '2018-01-02' });
      form.simulate('submit');
      await wait(1);
      wrapper.update();
      const { transactions } = client.readQuery({
        query: LIST_QUERY,
        variables: { dateStart: date.toISOString() },
      });
      expect(transactions).toHaveLength(1);
    });
  });
});
