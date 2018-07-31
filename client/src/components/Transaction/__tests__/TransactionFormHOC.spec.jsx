/* eslint-disable react/prop-types */
import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormWithData, {
  QUERY, ADD_MUTATION, DELETE_MUTATION,
} from '../TransactionFormHOC';
import transactions from '../mockData';

configure({ adapter: new Adapter() });

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

const addMutationMock = {
  request: { query: ADD_MUTATION, variables: { input: { ok: 1 } } },
  result: {
    data: {
      addTransaction: { transaction: usedTransaction },
    },
  },
};

const deleteMutationMock = success => ({
  request: { query: DELETE_MUTATION, variables: { id: usedTransaction.id } },
  result: { data: { deleteTransaction: { success } } },
});

const MockedComponent = ({ onSave, onDelete }) => (
  <form onSubmit={() => onSave({ ok: 1 })}>
    <button id="delete" type="button" onClick={onDelete} />
    <button type="submit" />
  </form>
);

const MockComponentWithData = FormWithData(MockedComponent);

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

describe('TransactionFormHOC', () => {
  describe('with router id params', () => {
    const allMocks = [queryMock, addMutationMock, deleteMutationMock(true)];

    const withProvider = (WrappedComponent, props) => mount(
      <MockedProvider mocks={allMocks}>
        <WrappedComponent {...props} />
      </MockedProvider>,
    );

    it('should successfully load', async () => {
      const wrapper = withProvider(MockComponentWithData, {
        location: { state: { id: usedTransaction.id } },
      });
      await wait();
      wrapper.update();
      expect(wrapper.find(MockedComponent).prop('transaction')).toEqual(expect.objectContaining(usedTransaction));
      expect(wrapper.find(MockedComponent).prop('onSave')).toBeDefined();
      expect(wrapper.find(MockedComponent).prop('onDelete')).toBeDefined();
    });

    it('should render loading state initially', () => {
      const wrapper = withProvider(MockComponentWithData, {
        location: { state: { id: usedTransaction.id } },
      });
      expect(wrapper.text()).toEqual('Loading...');
    });

    it('should show error UI', async () => {
      const mock = {
        request: {
          query: QUERY,
          variables: { id: '1' },
        },
        error: new Error('awwh'),
      };
      const wrapper = mount(
        <MockedProvider mocks={[mock]}>
          <MockComponentWithData location={{ state: { id: usedTransaction.id } }} />
        </MockedProvider>,
      );
      await wait();
      expect(wrapper.update().text()).toEqual('Error query!');
    });

    it('should successfully delete transaction', async () => {
      const wrapper = withProvider(MockComponentWithData, {
        location: { state: { id: usedTransaction.id } },
      });
      await wait();
      wrapper.update();
      wrapper.find('#delete').simulate('click');
      await wait(10);
      wrapper.update();
      expect(wrapper.find('[redirect]').prop('href')).toEqual('/transactions');
    });

    // it('should successfully update transaction', async () => {
    //   const wrapper = withProvider(MockComponentWithData, {
    //     location: { state: { id: usedTransaction.id } },
    //   });
    //   await wait();
    //   wrapper.update();
    //
    //   let input = component.find('Input[id="name"] input[id="name"]');
    //         expect(input.prop('value')).toEqual('role1');
    //
    //         input.simulate('change', {
    //             target: {
    //                 id: 'name',
    //                 value: 'role1changed'
    //             }
    //         })
    //         const button = component.find('Button[type="submit"]');
    //         button.simulate('submit');
    //
    //         await waitSomeMs(10);
    //         component.update();
    //         input = component.find('Input[id="name"] input[id="name"]');
    //         expect(input.prop('value')).toEqual('role1changed(ok)');
    //
    //
    //
    //   wrapper.find('#delete').simulate('click');
    //   await wait(10);
    //   wrapper.update();
    //   expect(wrapper.find('[redirect]').prop('href')).toEqual('/transactions');
    // });
  });

  describe('without router id params', () => {
    const allMocks = [addMutationMock];

    const withProvider = (WrappedComponent, props) => mount(
      <MockedProvider mocks={allMocks}>
        <WrappedComponent {...props} />
      </MockedProvider>,
    );

    it('should successfully load', async () => {
      const wrapper = withProvider(MockComponentWithData);
      await wait();
      wrapper.update();
      expect(wrapper.find(MockedComponent).prop('transaction')).not.toBeDefined();
      expect(wrapper.find(MockedComponent).prop('onSave')).toBeDefined();
      expect(wrapper.find(MockedComponent).prop('onDelete')).not.toBeDefined();
    });

    it('should successfully add transaction', async () => {
      const wrapper = withProvider(MockComponentWithData, {
        match: { url: '/add' },
      });
      await wait();
      wrapper.update();
      wrapper.find('form').simulate('submit');
      await wait(10);
      wrapper.update();
      expect(wrapper.find('[redirect]').prop('href')).toMatchSnapshot();
    });
  });
});
