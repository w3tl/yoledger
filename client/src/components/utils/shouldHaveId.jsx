/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import withId from './withId';

const shouldHaveId = (Component, backUrl) => withId((props) => {
  if (props.id) return <Component {...props} />;
  return <Redirect to={{ pathname: backUrl }} />;
});

export default shouldHaveId;
