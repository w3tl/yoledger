import React from 'react';

const withLabel = Component => ({ id, label = '', ...props }) => {
  const identifier = id || label.toLowerCase();
  if (label) {
    return (
      <label htmlFor={identifier}>
        {`${label}: `}
        <Component id={identifier} {...props} />
      </label>
    );
  }
  return <Component id={identifier} {...props} />;
};

export default withLabel;
