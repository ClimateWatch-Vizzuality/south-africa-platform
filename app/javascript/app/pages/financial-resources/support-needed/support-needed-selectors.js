import { createSelector, createStructuredSelector } from 'reselect';
import { supportNeededData } from 'data/mocks/financial-resources';
import { deburrUpper } from 'utils/utils';

const getQueryParams = ({ location = {} }) => location.query || null;

const getSearchValue = createSelector(
  getQueryParams,
  query => query ? query.search : ''
);

const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

const getSupportNeededData = () => supportNeededData || null;

const getParsedSupportNeededData = createSelector(
  [ getSupportNeededData, getSearchValue ],
  (data, searchFilter) => {
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
  }
);

const defaultColumns = [
  'type',
  'preferred_type',
  'sector_and_activity',
  'reference_to_policies_and_measures'
];
const ellipsisColumns = [];

const getTableData = createSelector(getParsedSupportNeededData, data => ({
  data,
  defaultColumns,
  ellipsisColumns
}));

export const getSupportNeeded = createStructuredSelector({
  query: getQueryParams,
  searchFilter: getSearchValue,
  activeTabValue: getActiveTabValue,
  tableData: getTableData
});
