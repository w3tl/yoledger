import React from 'react';
import PropTypes from 'prop-types';

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

const AssetFormWithData = (Component) => {
  const wrapped = (props) => {
    const { match: { params: { id } } } = props;
    const asset = assets.find(a => a.id === id);
    return <Component {...asset} {...props} />;
  };

  wrapped.propTypes = {
    match: PropTypes.shape({
      match: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string,
        }),
      }),
    }),
  };
  wrapped.defaultProps = {
    match: {
      params: {
        id: null,
      },
    },
  };
  return wrapped;
};

AssetFormWithData.propTypes = {
  Component: PropTypes.element,
};

export default AssetFormWithData;
