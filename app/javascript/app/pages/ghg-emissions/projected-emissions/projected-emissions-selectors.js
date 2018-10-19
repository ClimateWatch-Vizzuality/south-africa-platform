import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';

const API_DATA_SCALE = 1000000;

const getProjectedEmissionsData = ({ projectedEmissions = {} }) =>
  isEmpty(projectedEmissions.data) ? null : projectedEmissions.data.data;

const filterColumns = (array, filterIds) =>
  array.filter(col => filterIds.includes(col.label));

const parseData = createSelector(getProjectedEmissionsData, data => {
  if (!data) return null;
  const dataNames = {
    yMPAWOM: 'Scenario_MPA - WOM',
    yMPAWEM: 'Scenario_MPA_WEM',
    yLTMS: 'Scenario_LTMS',
    yPPD: [ 'Scenario_PPD_L', 'Scenario_PPD_U' ],
    yBAU: [ 'Scenario_BAU_L', 'Scenario_BAU_U' ]
  };
  const years = data[0] &&
    data[0].projected_emission_years &&
    data[0].projected_emission_years.map(d => d.year);
  const columnData = {};
  Object.keys(dataNames).forEach(code => {
    const columnName = dataNames[code];
    if (isArray(columnName)) {
      const updatedColumnName = columnName[0].includes('BAU') ? 'yBAU' : 'yPPD';
      columnData[updatedColumnName] = columnName.map(name => {
        const d = data.find(c => c.name === name);
        return d && d.projected_emission_years;
      });
    } else {
      const d = data.find(c => c.name === columnName);
      if (d) columnData[code] = d.projected_emission_years;
    }
  });

  const yearsData = years.map(year => {
    const columnsYearData = {};
    Object.keys(columnData).forEach(columnName => {
      const yearData = (name, index) => {
        const columnYearsData = index
          ? columnData[name][index]
          : columnData[name];
        return columnYearsData.find(v => v.year === year).value *
          API_DATA_SCALE;
      };
      if (isArray(columnData[columnName][0])) {
        columnsYearData[columnName] = [
          yearData(columnName, '0'),
          yearData(columnName, '1')
        ];
      } else {
        columnsYearData[columnName] = yearData(columnName);
      }
    });
    return { x: year, ...columnsYearData };
  });
  return yearsData;
});

const getChartData = createSelector(parseData, data => {
  if (!data) return null;
  const config = {
    config: {
      axes: {
        xBottom: { name: 'Year', unit: 'date', format: 'YYYY' },
        yLeft: { name: 'Emissions', unit: 'CO<sub>2</sub>e', format: 'number' }
      },
      theme: {
        yGHGInventory: { stroke: '#000000', fill: '#000000' },
        yMPAWEM: { stroke: '#00955f', fill: '#00955f' },
        yMPAWOM: { stroke: '#9854b1', fill: '#9854b1' },
        yPPD: { stroke: '#3498db', fill: '#d6eaf8' },
        yBAU: { stroke: '#f5b335', fill: '#fdf0d7' },
        yLTMS: { stroke: '#f97da1', fill: '#f97da1' }
      },
      tooltip: {
        yGHGInventory: { label: 'GHG Inventory' },
        yLTMS: { label: 'LTMs' },
        yPPD: { label: 'ppd' },
        yBAU: { label: 'BaU' },
        yMPAWEM: { label: 'MPA - WEM' },
        yMPAWOM: { label: 'MPA - WOM' }
      },
      animation: false,
      columns: {
        x: [ { label: 'year', value: 'x' } ],
        lineWithDots: [
          { label: 'MPA - WEM', value: 'yMPAWEM' },
          { label: 'MPA - WOM', value: 'yMPAWOM' }
        ],
        dots: [ { label: 'GHG Inventory', value: 'yGHGInventory' } ],
        rangedArea: [
          { label: 'ppd', value: 'yPPD' },
          { label: 'BaU', value: 'yBAU' }
        ],
        line: [ { label: 'LTMs', value: 'yLTMS' } ]
      }
    },
    initialLineWithDotsColumns: [
      { label: 'MPA - WEM', value: 'yMPAWEM' },
      { label: 'MPA - WOM', value: 'yMPAWOM' }
    ],
    initialRangedAreaColumns: [
      { label: 'ppd', value: 'yPPD' },
      { label: 'BaU', value: 'yBAU' }
    ],
    initialDotsColumns: [ { label: 'GHG Inventory', value: 'yGHGInventory' } ],
    initialLineColumns: [ { label: 'LTMs', value: 'yLTMS' } ],
    domain: { x: [ 'auto', 'auto' ], y: [ null, 'auto' ] },
    dataOptions: [
      { value: 13, label: 'GHG Inventory' },
      { value: 15, label: 'MPA - WOM' },
      { value: 14, label: 'MPA - WEM' },
      { value: 21, label: 'BaU' },
      { value: 22, label: 'ppd' },
      { value: 23, label: 'LTMs' }
    ],
    dataSelected: [
      { value: 13, label: 'GHG Inventory' },
      { value: 15, label: 'MPA - WOM' },
      { value: 14, label: 'MPA - WEM' },
      { value: 21, label: 'BaU' },
      { value: 22, label: 'ppd' },
      { value: 23, label: 'LTMs' }
    ],
    data
  };
  return { ...config };
});

const addColumnsToConfig = createSelector(getChartData, data => {
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

  return { ...data, config };
});

export const getData = createStructuredSelector({
  chartData: addColumnsToConfig
});
