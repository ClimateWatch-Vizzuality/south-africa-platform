import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import snakeCase from 'lodash/snakeCase';
import { deburrUpper } from 'utils/utils';
import { camelCase } from 'change-case';

const getData = ({ financialResourcesNeeded = {} }) =>
  isEmpty(financialResourcesNeeded.data) ||
    isEmpty(financialResourcesNeeded.data.data)
    ? null
    : financialResourcesNeeded.data.data;

const getQueryParams = ({ location = {} }) => location.query || null;
const getSection = ({ location = {} }) => location.payload.section || null;

const getSearchValue = createSelector(
  getQueryParams,
  query => query ? query.search : ''
);

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

const getParsedSupportNeededData = createSelector([ getData, getSearchValue ], (
  data,
  searchFilter
) =>
  {
    if (!data) return null;
    if (!searchFilter) return data;
    const filter = deburrUpper(searchFilter);
    const keysToSearch = defaultColumns.map(k => camelCase(k));
    return data.filter(
      d =>
        keysToSearch.reduce(
          (acc, key) => acc || deburrUpper(d[key]).indexOf(filter) > -1,
          false
        )
    );
  });

const defaultColumns = [
  'type',
  'preferred_type',
  'sector_and_activity',
  'reference_to_policies_and_measures'
];

const ellipsisColumns = [];

const renameColumnsToSnakeCase = createSelector(
  getParsedSupportNeededData,
  data => {
    if (!data) return null;
    return data.slice().map(d => {
      const updatedD = {};
      Object.keys(d).forEach(key => {
        updatedD[snakeCase(key)] = d[key];
      });
      return updatedD;
    });
  }
);

const getTableData = createSelector(renameColumnsToSnakeCase, data => ({
  data,
  defaultColumns,
  ellipsisColumns
}));

export const getSupportNeeded = createStructuredSelector({
  query: getQueryParams,
  searchFilter: getSearchValue,
  activeTabValue: getActiveTabValue,
  tableData: getTableData,
  section: getSection
});
