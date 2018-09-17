/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import { LIST_QUERY } from '../queries';
import formWithData from '../IncomeFormHOC';
import RawIncomeForm from '../IncomeForm';
import {
  wait, withProvider, testLoadingState, client,
} from '../../testHelpers';

jest.mock('react-router-dom', () => ({ // eslint-disable-next-line react/prop-types
  Redirect: ({ to }) => <a href={to}>Redirect</a>,
}));

const IncomeForm = formWithData(RawIncomeForm);
const FormWithoutLocationState = withProvider((props) => {
  props.client.writeQuery({
    query: LIST_QUERY,
    variables: { type: 'INCOME' },
    data: { accounts: [] },
  });
  return <IncomeForm />;
});
const FormWithLocationState = withProvider(() => (
  <IncomeForm location={{ state: { id: '31' } }} />
));

describe('IncomeFormHOC', () => {
  describe('with router id params', () => {
    testLoadingState(<FormWithLocationState />);

    it('should contain props', async () => {
      const wrapper = mount(<FormWithLocationState />);
      await wait();
      wrapper.update();
      const form = wrapper.find('IncomeForm');
      expect(form.prop('income').id).toBeDefined();
      expect(form.prop('onSave')).toBeDefined();
    });
  });

  describe('without router id params', () => {
    it('should successfully add expense', async () => {
      const wrapper = mount(<FormWithoutLocationState />);
      await wait();
      wrapper.update();
      wrapper.find('input').simulate('change', { target: { value: 'new account' } });
      wrapper.find('form').simulate('submit');
      await wait(1);
      wrapper.update();
      expect(wrapper.find('Redirect').prop('to')).toBeDefined();
      const { accounts } = client.readQuery({
        query: LIST_QUERY,
        variables: { type: 'INCOME' },
      });
      expect(accounts).toHaveLength(1);
    });
  });
});
