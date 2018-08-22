import React from 'react';
import { mount } from 'enzyme';
import { LIST_QUERY } from '../queries';
import TransactionForm from '../TransactionFormHOC';
import transactionsData from '../mockData';
import {
  wait, withProvider, client,
} from '../../testHelpers/index';

const usedTransaction = transactionsData[0];
const date = new Date('2018-01-01');

const FormCreateNew = withProvider(props => <TransactionForm dateStart={date} {...props} />);
const FormEdit = withProvider(props => (
  <TransactionForm dateStart={date} transaction={usedTransaction} {...props} />));


describe('TransactionFormHOC', () => {
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
      wrapper.find('#delete').simulate('click');
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
      wrapper.find('#from').simulate('change', { target: { value: 'Bank Card' } });
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
      const wrapper = mount(<FormCreateNew />);
      await wait();
      wrapper.update();
      wrapper.find('#from').simulate('change', { target: { value: 'Cash' } });
      wrapper.find('#to').simulate('change', { target: { value: 'Food' } });
      wrapper.find('form').simulate('submit');
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
