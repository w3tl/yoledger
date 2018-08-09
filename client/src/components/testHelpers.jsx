import React from 'react';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

export const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

export const withProvider = Component => props => (
  <MockedProvider {...props}>
    <Component />
  </MockedProvider>
);

export const testRenderWithoutError = (Component) => {
  it('renders without error', async () => {
    const wrapper = shallow(Component);
    await wait();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
};

export const testLoadingState = (Component) => {
  it('should render loading state initially', () => {
    const wrapper = mount(Component);
    expect(wrapper.text()).toEqual('Loading...');
  });
};

export const testErrorUI = (Component) => {
  it('should show error UI', async () => {
    const wrapper = mount(Component);
    await wait(0); // wait for response
    expect(wrapper.update().text()).toContain('Error');
  });
};

// THNX: http://blog.blakesimpson.co.uk/read/98-how-to-stub-date-in-jest-tests-building-a-stubdate-helper
export const stubDate = (fixedDate) => {
  let originalDate;

  beforeAll(() => {
    originalDate = Date;

    global.Date = class extends Date {
      constructor() {
        super();

        return fixedDate;
      }
    };
  });

  afterAll(() => {
    global.Date = originalDate;
  });
};
