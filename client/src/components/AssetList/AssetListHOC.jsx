import React from 'react';

const assets = [{
  id: '1',
  name: 'Bank Card',
}, {
  id: '2',
  name: 'Cash',
}, {
  id: '3',
  name: 'Bank Card 2',
}];

const AssetsWithData = Component => props => (
  <Component assets={assets} {...props} />
);

export default AssetsWithData;
