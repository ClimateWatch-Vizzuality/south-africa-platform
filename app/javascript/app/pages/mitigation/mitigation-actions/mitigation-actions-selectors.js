import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { deburrUpper } from 'app/utils';
import camelCase from 'lodash/camelCase';

const getMitigationData = ({ mitigationActions = {} }) =>
  isEmpty(mitigationActions.data) || isEmpty(mitigationActions.data.data)
    ? null
    : mitigationActions.data.data;
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

const filterMitigationDataByTab = createSelector(
  [ getMitigationData, getActiveTabValue ],
  (data, tab) => {
    if (!data) return null;
    if (!tab || tab === 'allActions') return data;
    return data.filter(
      d =>
        tab === 'quantifiedEffects' ? d.quantifiedEffect : !d.quantifiedEffect
    );
  }
);

const getParsedMitigation = createSelector(
  [ filterMitigationDataByTab, getSearchValue ],
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
const renameMitigationColumns = createSelector(getParsedMitigation, data => {
  if (!data) return null;
  return data.map(d => {
    const updatedD = d;
    Object.keys(d).forEach(key => {
      switch (key) {
        case 'mitigationTheme':
          updatedD.theme = d.mitigationTheme.title;
          break;
        case 'mitigationType':
          updatedD.type = d.mitigationType;
          break;
        case 'timeHorizon':
          updatedD.time_horizon = d.timeHorizon;
          break;
        case 'estimatedEmissionReduction':
          updatedD.estimated_emission_reduction = d.estimatedEmissionReduction;
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
