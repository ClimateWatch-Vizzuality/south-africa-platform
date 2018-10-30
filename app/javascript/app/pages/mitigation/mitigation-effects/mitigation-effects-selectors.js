import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getSustainableData = ({ mitigationEffects = {} }) =>
  isEmpty(mitigationEffects.data) || isEmpty(mitigationEffects.data.data)
    ? null
    : mitigationEffects.data.data;

const getSustainableMeta = ({ mitigationEffects = {} }) =>
  isEmpty(mitigationEffects.data) || isEmpty(mitigationEffects.data.meta)
    ? null
    : mitigationEffects.data.meta;

const getQueryParams = ({ location = {} }) => location.query || null;
const getActiveTabValue = createSelector(
  getQueryParams,
  query => query ? query.tab : null
);

const getEffectsIndicatorName = createSelector(
  [ getSustainableData, getSustainableMeta ],
  (data, meta) => {
    if (!meta || isEmpty(meta) || !data || isEmpty(data)) return null;
    const effectNames = {};
    Object.keys(data[0]).forEach(key => {
      if (key.startsWith('effects')) {
        effectNames[key] = meta.find(m => m.code === key).indicator;
      }
    });
    return effectNames;
  }
);

const getTableData = createSelector(
  [ getSustainableData, getSustainableMeta, getEffectsIndicatorName ],
  (data, meta, effectNames) => {
    if (!meta || isEmpty(meta) || !effectNames) return null;
    const tableData = data.map(d => {
      const updatedD = {};
      Object.keys(d).forEach(key => {
        if (key.startsWith('effects')) {
          updatedD[effectNames[key]] = d[key];
        } else {
          updatedD[key] = d[key];
        }
      });
      return updatedD;
    });
    return { data: tableData, defaultColumns: Object.keys(tableData[0]) };
  }
);

export const getSustainableDevelopmentData = createStructuredSelector({
  tableData: getTableData,
  activeTabValue: getActiveTabValue
});
