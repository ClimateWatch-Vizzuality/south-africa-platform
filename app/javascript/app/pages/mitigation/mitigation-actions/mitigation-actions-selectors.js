import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { deburrUpper } from 'app/utils';

const getMitigationData = ({ mitigationActions = {} }) =>
  isEmpty(mitigationActions.data) ? null : mitigationActions.data;
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
  'theme',
  'name',
  'objectives',
  'type',
  'status',
  'actor',
  'time_horizon',
  'ghg',
  'estimated_emission_reduction'
];
const ellipsisColumns = [];

const getParsedMitigation = createSelector(
  [ getMitigationData, getSearchValue ],
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
const renameMitigationColumns = createSelector(getParsedMitigation, data => {
  if (!data) return null;
  return data.map(d => {
    const updatedD = d;
    Object.keys(d).forEach(key => {
      switch (key) {
        case 'mitigation_theme':
          updatedD.theme = d.mitigation_theme.title;
          break;
        case 'mitigation_type':
          updatedD.type = d.mitigation_type;
          break;
        default:
          updatedD[key] = d[key];
          break;
      }
    });
    return updatedD;
  });
});

const getTableData = createSelector(renameMitigationColumns, data => ({
  data,
  defaultColumns,
  ellipsisColumns
}));

export const getMitigationActions = createStructuredSelector({
  query: getQueryParams,
  tableData: getTableData,
  searchFilter: getSearchValue,
  activeTabValue: getActiveTabValue
});
