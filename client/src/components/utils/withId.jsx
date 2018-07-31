/* eslint-disable react/prop-types */
import React from 'react';

const withId = Wrapped => (props) => {
  const { location } = props;
  if (location && location.state) {
    return <Wrapped {...props} {...location.state} />;
  }
  return <Wrapped {...props} />;
};

export default withId;
