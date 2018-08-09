import React from 'react';
import { mount } from 'enzyme';
import formWithData, {
  QUERY, ADD_MUTATION, DELETE_MUTATION,
} from '../TransactionFormHOC';
import TransactionForm from '../TransactionForm';
import transactions from '../mockData';
import {
  wait, withProvider, testLoadingState, testErrorUI,
} from '../../testHelpers';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Redirect: ({ to }) => <a redirect="true" href={to}>Redirect</a>,
}));

const usedTransaction = transactions[0];

const queryMock = {
  request: { query: QUERY, variables: { id: usedTransaction.id } },
  result: {
    data: { transaction: { __typename: 'Transaction', ...usedTransaction } },
  },
};

const deleteMutationMock = success => ({
  request: { query: DELETE_MUTATION, variables: { id: usedTransaction.id } },
  result: { data: { deleteTransaction: { __typename: 'DeleteTransactionPayload', success } } },
});

describe('TransactionFormHOC', () => {
  const fixedDate = new Date('2018-06-10');

  const ComponentWithData = formWithData(TransactionForm);
  const ComponentWithLocationState = withProvider(() => (
    <ComponentWithData location={{ state: { id: usedTransaction.id } }} />
  ));
  const ComponentWithoutLocationState = withProvider(() => (
    <ComponentWithData
      transaction={{
        amount: null, source: { name: '' }, destination: { name: '' }, date: fixedDate.toISOString(),
      }}
    />
  ));

  describe('with router id params', () => {
    const addMutationMock = {
      request: {
        query: ADD_MUTATION,
        variables: {
          input: {
            amount: usedTransaction.amount,
            source: usedTransaction.source.name,
            destination: usedTransaction.destination.name,
            date: usedTransaction.date,
          },
        },
      },
      result: {
        data: {
          addTransaction: { transaction: usedTransaction },
        },
      },
    };
    const mocks = [queryMock, addMutationMock, deleteMutationMock(true)];
    const errorMocks = [{ ...queryMock, error: new Error('awwh') }];

    testLoadingState(<ComponentWithLocationState mocks={[]} />);
    testErrorUI(<ComponentWithLocationState mocks={errorMocks} />);

    it('should contain props', async () => {
      const wrapper = mount(<ComponentWithLocationState mocks={mocks} />);
      await wait();
      wrapper.update();
      expect(wrapper.find('TransactionForm').prop('transaction')).toEqual(expect.objectContaining(usedTransaction));
      expect(wrapper.find('TransactionForm').prop('onSave')).toBeDefined();
      expect(wrapper.find('TransactionForm').prop('onDelete')).toBeDefined();
    });

    it('should successfully delete transaction', async () => {
      const wrapper = mount(<ComponentWithLocationState mocks={mocks} />);
      await wait();
      wrapper.update();
      wrapper.find('#delete').simulate('click');
      await wait(10);
      wrapper.update();
      expect(wrapper.find('[redirect]').prop('href')).toEqual('/transactions');
    });

    // it('should successfully update transaction', async () => {
    // });
  });

  describe('without router id params', () => {
    const addMutationMock = {
      request: {
        query: ADD_MUTATION,
        variables: {
          input: {
            amount: null,
            source: '',
            destination: '',
            date: fixedDate.toISOString(),
          },
        },
      },
      result: {
        data: {
          addTransaction: { __typename: 'AddTrasactionPayload', transaction: usedTransaction },
        },
      },
    };
    const mocks = [addMutationMock];
    const errorMocks = [{ ...addMutationMock, error: new Error('awwh') }];

    // testLoadingState(<ComponentWithoutLocationState mocks={[]} />);
    // testErrorUI(<ComponentWithoutLocationState mocks={errorMocks} />);

    it('should successfully add transaction', async () => {
      const wrapper = mount(<ComponentWithoutLocationState mocks={mocks} />);
      await wait();
      wrapper.update();
      wrapper.find('form').simulate('submit');
      await wait();
      wrapper.update();
      expect(wrapper.find('[redirect]').prop('href')).toMatchSnapshot();
    });
  });
});
