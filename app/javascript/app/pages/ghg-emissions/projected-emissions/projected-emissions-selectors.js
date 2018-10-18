import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getProjectedEmissionsData = ({ projectedEmissions = {} }) =>
  isEmpty(projectedEmissions.data) ? null : projectedEmissions.data;

const filterColumns = (array, filterIds) =>
  array.filter(col => filterIds.includes(col.label));

const selectChartColumns = data => {
  if (!data || !data.dataSelected) return null;
  const {
    initialLineWithDotsColumns,
    initialRangedAreaColumns,
    initialDotsColumns,
    initialLineColumns,
    config,
    dataSelected
  } = data;

  const filterIds = dataSelected.map(f => f.label);

  config.columns.lineWithDots = filterColumns(
    initialLineWithDotsColumns,
    filterIds
  );
  config.columns.rangedArea = filterColumns(
    initialRangedAreaColumns,
    filterIds
  );
  config.columns.dots = filterColumns(initialDotsColumns, filterIds);
  config.columns.line = filterColumns(initialLineColumns, filterIds);

  return config;
};

const getChartData = createSelector(getProjectedEmissionsData, data => {
  if (!data) return null;

  const config = selectChartColumns(data);

  return { ...data, config };
});

export const getData = createStructuredSelector({ chartData: getChartData });
