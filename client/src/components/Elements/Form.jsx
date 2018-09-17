import React from 'react';
import PropTypes from 'prop-types';
import { Form as UIForm, Message } from 'semantic-ui-react';
import { errorPropType } from '../propTypes';

function Form({
  error, loading, children, onSubmit,
}) {
  const props = {};
  if (onSubmit) props.onSubmit = onSubmit;
  return (
    <UIForm loading={loading} error={!!error} {...props}>
      {children}
      <Message
        error
        header="Could you check something!"
        list={error && error.graphQLErrors.map(e => e.message)}
        hidden={!error}
      />
    </UIForm>
  );
}

Form.propTypes = {
  error: errorPropType, // eslint-disable-line react/require-default-props
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Form.defaultProps = {
  loading: false,
};

Form.Field = UIForm.Field;
Form.Button = UIForm.Button;
Form.Checkbox = UIForm.Checkbox;
Form.Dropdown = UIForm.Dropdown;
Form.Group = UIForm.Group;
Form.Input = UIForm.Input;
Form.Radio = UIForm.Radio;
Form.Select = UIForm.Select;
Form.TextArea = UIForm.TextArea;

export default Form;
