import React from 'react';
import { shallow } from 'enzyme';
import Select from '../Select';
import { testRenderWithoutError } from '../../testHelpers/index';

const options = [{
  value: 'value1', label: 'Value 1',
}, {
  value: 'value2', label: 'Value 2',
}, {
  value: 'value3', label: 'Value 3',
}];

describe('Select', () => {
  testRenderWithoutError(<Select options={options} />);

  it('should handle change', () => {
    const onChange = jest.fn();
    const output = shallow(
      <Select options={options} onChange={onChange} />,
    );
    output.simulate('change', { target: { value: 'value2' } });
    expect(onChange).toHaveBeenCalledWith({ target: { value: 'value2' } });
  });
});
