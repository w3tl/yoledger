import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Input, Button, Form as UIForm } from 'semantic-ui-react';
import {
  AccountInput, AmountInput, DateInput, Form,
} from '../src/components/Elements';

storiesOf('Elements/DateInput', module)
  .add('default', () => <DateInput name="DateInput" />)
  .add('with label', () => <DateInput name="DateInput" label="Input here" />)
  .add('with value', () => <DateInput name="DateInput" dateFormat="YYYY-MM-DD" value="2018-01-02" onChange={action('Value changed')} />);

storiesOf('Elements/AccountInput', module)
  .add('default', () => <AccountInput />)
  .add('with value', () => <AccountInput value="Food" onChange={action('onChange')} />);

storiesOf('Elements/AmountInput', module)
  .add('default', () => <AmountInput />)
  .add('with value', () => <AmountInput value={10000.9} onChange={action('onChange')} />);

const FormFilled = props => (
  <Form {...props}>
    <UIForm.Field control={Input} label="Name" value="Name" />
    <Button type="submit" content="Submit" />
  </Form>
);

storiesOf('Elements/Form', module)
  .add('default', () => <FormFilled />)
  .add('loading', () => <FormFilled loading />)
  .add('with one error', () => <FormFilled error={{ graphQLErrors: [{ message: 'Some error occured' }] }} />)
  .add('with two error', () => <FormFilled error={{ graphQLErrors: [{ message: 'Some error occured' }, { message: 'Second error' }] }} />);
