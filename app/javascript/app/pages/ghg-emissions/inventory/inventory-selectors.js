import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { deburrUpper } from 'app/utils';
import camelCase from 'lodash/camelCase';

const getInventoryData = ({ GHGInventory = {} }) =>
  isEmpty(GHGInventory.data) || isEmpty(GHGInventory.data.data)
    ? null
    : GHGInventory.data.data;
const getQueryParams = ({ location = {} }) => location.query || null;

const getSearchValue = createSelector(
  getQueryParams,
  query => query ? query.search : ''
);

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

const defaultColumns = [
  'project',
  'objective',
  'partner',
  'donor',
  'outcome',
  'timelines',
  'sector',
  'status'
];
const ellipsisColumns = [];

const getParsedInventory = createSelector(
  [ getInventoryData, getSearchValue ],
  (data, searchFilter) => {
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
  }
);
const getTableData = createSelector(getParsedInventory, data => ({
  data,
  defaultColumns,
  ellipsisColumns
}));

export const getGHGInventory = createStructuredSelector({
  query: getQueryParams,
  tableData: getTableData,
  searchFilter: getSearchValue,
  activeTabValue: getActiveTabValue
});
