/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import { LIST_QUERY } from '../queries';
import RawCategoriesPage, { updateAfterAdd } from '../CategoriesPageHOC';
import {
  wait, withProvider, testLoadingState, client,
} from '../../testHelpers';


const CategoriesPage = withProvider((props) => {
  props.client.writeQuery({
    query: LIST_QUERY,
    data: { expenses: [], incomes: [] },
  });
  return <RawCategoriesPage {...props} />;
});

describe('CategoriesPageHOC', () => {
  testLoadingState(<CategoriesPage />);

  describe('updateAfterAdd', () => {
    it('should update expense cache', () => {
      const writeQuery = jest.fn();
      const cache = {
        readQuery: jest.fn().mockReturnValue({ expenses: [], incomes: [] }),
        writeQuery,
      };
      const data = { addAccount: { account: { type: 'EXPENSE' } } };
      updateAfterAdd(cache, { data });
      expect(writeQuery.mock.calls[0][0].data).toMatchSnapshot('writeQuery');
    });

    it('should update income cache', () => {
      const writeQuery = jest.fn();
      const cache = {
        readQuery: jest.fn().mockReturnValue({ expenses: [], incomes: [] }),
        writeQuery,
      };
      const data = { addAccount: { account: { type: 'INCOME' } } };
      updateAfterAdd(cache, { data });
      expect(writeQuery.mock.calls[0][0].data).toMatchSnapshot('writeQuery');
    });
  });

  it('should contain props', async () => {
    const wrapper = mount(<CategoriesPage />);
    await wait();
    wrapper.update();
    const form = wrapper.find('CategoriesPage');
    expect(form.prop('expenses')).toBeDefined();
    expect(form.prop('incomes')).toBeDefined();
  });

  it('should successfully add expense', async () => {
    const wrapper = mount(<CategoriesPage defaultActiveIndex={2} />);
    await wait();
    wrapper.update();
    wrapper.find('input[name="name"]').first().simulate('change', { target: { value: 'new expense' } });
    wrapper.find('form').simulate('submit');
    await wait(1);
    wrapper.update();
    const { expenses } = client.readQuery({
      query: LIST_QUERY,
    });
    expect(expenses).toHaveLength(1);
  });
});
