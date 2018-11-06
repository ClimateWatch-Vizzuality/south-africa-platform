import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';

import lineAndDot from 'assets/icons/legend/line-and-dot.svg';
import rangeCircle from 'assets/icons/legend/range-circle.svg';
import strippedLine from 'assets/icons/legend/stripped-line.svg';
import wideLine from 'assets/icons/legend/wide-line.svg';

const API_DATA_SCALE = 1000000;

const dataNames = {
  yMPAWOM: 'Scenario_MPA - WOM',
  yMPAWEM: 'Scenario_MPA_WEM',
  yLTMS: 'Scenario_LTMS',
  yPPD: [ 'Scenario_PPD_L', 'Scenario_PPD_U' ],
  yBAU: [ 'Scenario_BAU_L', 'Scenario_BAU_U' ]
};

const getProjectedEmissionsData = ({ projectedEmissions = {} }) =>
  isEmpty(projectedEmissions.data) ? null : projectedEmissions.data.data;

const getProjectedEmissionsMetaData = ({ projectedEmissions = {} }) =>
  isEmpty(projectedEmissions.data) ? null : projectedEmissions.data.meta;

const getModelSelection = ({ location }) =>
  location.query ? location.query.dataSelected : null;

const parseData = createSelector(getProjectedEmissionsData, data => {
  if (!data) return null;
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

  const yearsData = years && years.map(year => {
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

const getModelOptions = () => [
  {
    query: 'GHGInventory',
    label: 'GHG Inventory',
    type: 'dots',
    value: 'yGHGInventory'
  },
  {
    query: 'MPA-WOM',
    label: 'MPA - WOM',
    type: 'lineWithDots',
    value: 'yMPAWOM'
  },
  {
    query: 'MPA-WEM',
    label: 'MPA - WEM',
    type: 'lineWithDots',
    value: 'yMPAWEM'
  },
  {
    query: 'BaU',
    label: 'BaU',
    type: 'rangedArea',
    value: 'yBAU',
    combined: true
  },
  {
    query: 'ppd',
    label: 'ppd',
    type: 'rangedArea',
    value: 'yPPD',
    combined: true
  },
  { query: 'LTMs', label: 'LTMs', type: 'line', value: 'yLTMS' }
];

const getModelsSelected = createSelector(
  [ getModelOptions, getModelSelection ],
  (models, modelSelected) => {
    if (!modelSelected) return models;
    const modelsParsed = modelSelected.split(',');
    return models.filter(s => modelsParsed.indexOf(s.query) > -1);
  }
);

const getChartData = createSelector(
  [
    parseData,
    getModelOptions,
    getModelsSelected,
    getProjectedEmissionsMetaData
  ],
  (data, dataOptions, dataSelected, metadata) => {
    if (!data) return null;

    const getTooltipContent = (meta, { value, combined }) => {
      const info = dataNames[value] && meta.find(m => {
          if (combined) {
            return m.code === dataNames[value][0];
          }
          return m.code === dataNames[value];
        });
      return info &&
        (combined
          ? info.definition.substring(0, info.definition.indexOf('-'))
          : info.definition);
    };
    const createColumnObject = (indicatorsSelected, columnType, meta) =>
      indicatorsSelected.reduce(
        (acc, i) =>
          i.type === columnType
            ? [ ...acc, { ...i, legendTooltip: getTooltipContent(meta, i) } ]
            : acc,
        []
      );

    const config = {
      config: {
        axes: {
          xBottom: { name: 'Year', unit: 'date', format: 'YYYY' },
          yLeft: {
            name: 'Emissions',
            unit: 'CO<sub>2</sub>e',
            format: 'number'
          }
        },
        theme: {
          yGHGInventory: {
            stroke: '#000000',
            fill: '#000000',
            icon: strippedLine
          },
          yMPAWEM: { stroke: '#00955f', fill: '#00955f' },
          yMPAWOM: { stroke: '#9854b1', fill: '#9854b1', icon: lineAndDot },
          yPPD: { stroke: '#3498db', fill: '#d6eaf8', icon: rangeCircle },
          yBAU: { stroke: '#f5b335', fill: '#fdf0d7', icon: rangeCircle },
          yLTMS: { stroke: '#f97da1', fill: '#f97da1', icon: wideLine }
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
          lineWithDots: createColumnObject(
            dataSelected,
            'lineWithDots',
            metadata
          ),
          dots: createColumnObject(dataSelected, 'dots', metadata),
          rangedArea: createColumnObject(dataSelected, 'rangedArea', metadata),
          line: createColumnObject(dataSelected, 'line', metadata)
        }
      },
      domain: { x: [ 'auto', 'auto' ], y: [ null, 'auto' ] },
      dataOptions,
      dataSelected,
      data
    };
    return { ...config };
  }
);

export const getData = createStructuredSelector({ chartData: getChartData });
