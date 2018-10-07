/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { wait, client, stubDate } from './components/testHelpers/index';
import App from './App';
import { GET_PAGE_SETTINGS } from './components/Transaction/queries';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

jest.mock('./components/Routes', () => ({ signin }) => (
  <button id="signin" type="submit" onClick={() => signin('new token')} />
));

describe('App', () => {
  stubDate('2017-12-31');

  it('should unset token and clear store after sign out', async () => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTQ3NjQ4MDB9.fbvqGzT4kOW9MBvNux5QHiSv479qx3-wiVuAiCUkBSc');
    client.writeQuery({
      query: GET_PAGE_SETTINGS,
      variables: { type: 'INCOME' },
      data: { settings: { __typename: 'AppSettings', transaction: { __typename: 'TransactionSettings', date: '2018-01-01', period: 'DAY' } } },
    });
    const output = mount(<App />);
    await wait();
    expect(Object.keys(client.store.cache.data.data).length).toBeGreaterThan(0);
    output.find('[name="signout"]').simulate('click');
    await wait(10);
    expect(localStorage.getItem('token')).toBeNull();
    expect(client.store.cache.data.data.ROOT_QUERY).toMatchSnapshot();
  });

  it('should set token after sign in', async () => {
    localStorage.removeItem('token');
    const output = mount(<App />);
    await wait();
    output.find('#signin').simulate('click');
    await wait(5);
    expect(localStorage.getItem('token')).toBeDefined();
  });
});

// expect(Object.keys(client.store.cache.data.data).length).toBeGreaterThan(0);

// client.writeQuery({
//   query: GET_PAGE_SETTINGS,
//   variables: { type: 'INCOME' },
//   data: { settings: { __typename: 'AppSettings', transaction: { __typename: 'TransactionSettings', date: '2018-01-01', period: 'DAY' } } },
// });
// expect(localStorage.getItem('token')).toBeNull();
// expect(Object.keys(client.store.cache.data.data)).toHaveLength(0);
