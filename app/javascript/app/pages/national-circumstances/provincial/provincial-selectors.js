import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import { parseMarkdownToHtml } from 'utils/flagship-programmes';

const getQueryParams = ({ location = {} }) => location.query || null;

const selectNationalCircumstancesPriorities = (
  { nationalCircumstancesPriorities = {} }
) =>
  nationalCircumstancesPriorities &&
    has(nationalCircumstancesPriorities, 'data.data') &&
    nationalCircumstancesPriorities.data.data ||
    null;

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

const getSelectedData = createSelector(
  [ selectNationalCircumstancesPriorities, getActiveTabValue ],
  (data, tab) => {
    if (!data || isEmpty(data)) return null;
    const selectedTab = tab || 'mitigation';
    const selectedData = {};
    data.forEach(d => {
      if (d.code === `Dev_priorities_${selectedTab}`) {
        selectedData[d.location.name] = parseMarkdownToHtml(d.value);
      }
    });
    return selectedData;
  }
);

export const getProvincial = createStructuredSelector({
  query: getQueryParams,
  selectedData: getSelectedData,
  activeTabValue: getActiveTabValue
});
