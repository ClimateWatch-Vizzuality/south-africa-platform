import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { deburrUpper } from 'app/utils';

const getInventoryData = ({ GHGInventory = {} }) =>
  isEmpty(GHGInventory.data) ? null : GHGInventory.data;
const getQueryParams = ({ location = {} }) => location.query || null;

const getInventory = createSelector(getInventoryData, inventory => inventory);

const getSearchValue = createSelector(
  getQueryParams,
  query => query ? query.search : ''
);

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

const defaultColumns = [ 'name', 'definition', 'unit', 'composite_name' ];
const ellipsisColumns = [ 'composite_name' ];

const getParsedInventory = createSelector([ getInventory, getSearchValue ], (
  data,
  searchFilter
) =>
  {
    if (!data) return null;
    if (!searchFilter) return data;
    const filter = deburrUpper(searchFilter);
    const keysToSearch = defaultColumns;
    return data.filter(
      d =>
        keysToSearch.reduce(
          (acc, key) => acc || deburrUpper(d[key]).indexOf(filter) > -1,
          false
        )
    );
  });
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
