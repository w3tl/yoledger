import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import 'semantic-ui-css/semantic.min.css';
import { MemoryRouter } from 'react-router-dom';
import apolloDecorator from './apolloDecorator';

addDecorator(apolloDecorator);
addDecorator(story => (<MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>));

const req = require.context('../stories', true, /\.jsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
