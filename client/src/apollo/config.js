// eslint-disable-next-line no-undef
const hostname = window && window.location && window.location.hostname;
// eslint-disable-next-line import/prefer-default-export
export const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || `https://api.${hostname}/graphql`;
