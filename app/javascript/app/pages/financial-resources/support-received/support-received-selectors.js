import { createSelector, createStructuredSelector } from 'reselect';

const getQueryParams = ({ location = {} }) => location.query || null;

const getSearchValue = createSelector(
  getQueryParams,
  query => query ? query.search : ''
);

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

export const getSupportReceived = createStructuredSelector({
  query: getQueryParams,
  searchFilter: getSearchValue,
  activeTabValue: getActiveTabValue
});
