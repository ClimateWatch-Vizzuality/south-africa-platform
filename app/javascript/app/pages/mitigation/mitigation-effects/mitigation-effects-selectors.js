import { createSelector, createStructuredSelector } from 'reselect';

const getQueryParams = ({ location = {} }) => location.query || null;
const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

export const getSustainableDevelopmentData = createStructuredSelector({
  activeTabValue: getActiveTabValue
});
