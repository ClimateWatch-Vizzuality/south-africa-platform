import { createSelector, createStructuredSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import { flatten, sumBy } from 'lodash';

import intersection from 'lodash/intersection';
import { METRIC_OPTIONS } from 'utils/defaults';
import {
  DEFAULT_AXES_CONFIG,
  getMetricRatio,
  getYColumnValue,
  getTooltipConfig
} from 'utils/graphs';

const { COUNTRY_ISO } = process.env;
const defaults = { gas: 'All GHG', source: 'DEA2017b', sector: 'Energy' };
const fiteredSectors = ['Energy', 'Waste', 'Agriculture, Forestry, and Other Land Use', 'Industrial Processes and Product Use'];

const getMetaData = ({ metadata = {} }) =>
  metadata.ghg ? metadata.ghg.data : null;
const getMetricParam = ({ location }) =>
  location.query ? location.query.metric : null;
const getWBData = ({ WorldBank }) =>
  WorldBank.data[COUNTRY_ISO] || null;
const getEmissionsData = ({ GHGEmissions = {} }) => 
  isEmpty(GHGEmissions.data) ? null : uniqBy(GHGEmissions.data, 'value');
const getEmissionsDataRaw = ({ GHGEmissions = {} }) => 
  isEmpty(GHGEmissions.data) ? null : GHGEmissions.data;
const getChartLoading = ({ metadata = {}, GHGEmissions = {} }) =>
  metadata.ghg.loading || GHGEmissions.loading;
const getSectionContent = ({ SectionsContent }) =>
  SectionsContent.data && SectionsContent.data.historical_emissions;

const getSummarisedEmissionData = createSelector(
  getEmissionsDataRaw,
  data => {
    if(!data) return  [];
    const emissionsArr = flatten(data.filter(({ sector }) => fiteredSectors.includes(sector)).map(({ emissions }) => emissions));
    const emissionsByYear = groupBy(emissionsArr, 'year');
    return Object.keys(emissionsByYear).map(year => 
      ({ year: parseInt(year, 10), value: sumBy(emissionsByYear[year], 'value') })
    );
  }
);

const getGas = createSelector(getMetaData, meta => {
  if (!meta || !meta.gas) return null;
  const selected = meta.gas.find(gas => gas.label === defaults.gas);
  return selected && selected.value || null;
});
const getSource = createSelector(getMetaData, meta => {
  if (!meta || !meta.dataSource) return null;
  const selected = meta.dataSource.find(
    source => source.label === defaults.source
  );
  return selected && selected.value || null;
});
const getSector = createSelector(getMetaData, meta => {
  if (!meta || !meta.sector) return null;
  const selected = meta.sector.find(source => source.label === defaults.sector);
  return selected && selected.value || null;
});

export const getEmissionsParams = createSelector(
  [ getSource, getGas, getSector ],
  (source, gas, sector) => {
    if (!source || !gas || !sector) return null;
    return { location: COUNTRY_ISO, gas, source, sector };
  }
);

export const getMetricOptions = createSelector(
  [],
  () => Object.keys(METRIC_OPTIONS).map(key => METRIC_OPTIONS[key])
);

export const getMetricSelected = createSelector(
  [ getMetricOptions, getMetricParam ],
  (metrics, metric) => {
    if (!metric) return metrics[0];
    return metrics.find(m => m.value === metric);
  }
);

const getCalculationData = createSelector([ getWBData ], data => {
  if (!data || !data.length) return null;
  return groupBy(data, 'year');
});

export const parseChartData = createSelector(
  [ getEmissionsData, getMetricSelected, getCalculationData, getSummarisedEmissionData ],
  (emissionsData, metricSelected, calculationData, summarisedData) => {
    if (!emissionsData) return null;
    const [ data ] = emissionsData;
    const yKey = getYColumnValue(data.gas);
    const dataParsed = summarisedData.map(({ year, value }) => {
      const yItems = {};
      const calculationRatio = getMetricRatio(
        metricSelected.value,
        calculationData,
        year
      );
      if (value)
        yItems[yKey] = value * 1000 / calculationRatio;  // 1000 is the data scale from the API, originally value is in kt

      const item = { x: year, ...yItems };
      return item;
    });
    return dataParsed;
  }
);

export const getChartConfig = createSelector(
  [ getEmissionsData, getMetricSelected ],
  (data, metricSelected) => {
    if (!data) return null;
    const yColumns = data.map(d => ({
      label: d.gas,
      value: getYColumnValue(d.gas)
    }));
    const theme = yColumns.reduce(
      (acc, next) => ({
        ...acc,
        [next.value]: { stroke: '#00955f', fill: '#00955f' }
      }),
      {}
    );
    const tooltip = getTooltipConfig(yColumns);
    let { unit } = DEFAULT_AXES_CONFIG.yLeft;
    if (metricSelected.value === METRIC_OPTIONS.PER_GDP.value) {
      unit = `${unit}/ million $ GDP`;
    } else if (metricSelected.value === METRIC_OPTIONS.PER_CAPITA.value) {
      unit = `${unit} per capita`;
    } else {
      unit = `Mt${unit}`;
    }
    const axes = {
      ...DEFAULT_AXES_CONFIG,
      yLeft: { ...DEFAULT_AXES_CONFIG.yLeft, unit }
    };
    return {
      axes,
      theme,
      tooltip,
      animation: false,
      columns: { x: [ { label: 'year', value: 'x' } ], y: yColumns }
    };
  }
);

export const getChartFilters = createSelector(() => [ { label: 'All GHG' } ]);

export const getChartFilterSelected = createSelector(() => [
  { label: 'All GHG' }
]);

const getTitleAndDescription = createSelector(
  [ getSectionContent ],
  sectionContent => {
    const content = {
      title: sectionContent && sectionContent.title,
      description: sectionContent && sectionContent.description
    };
    return content;
  }
);

export const getChartData = createStructuredSelector({
  data: parseChartData,
  config: getChartConfig,
  loading: getChartLoading,
  dataOptions: getChartFilters,
  dataSelected: getChartFilterSelected
});

export const getTotalGHGEMissions = createStructuredSelector({
  metricOptions: getMetricOptions,
  metricSelected: getMetricSelected,
  emissionsParams: getEmissionsParams,
  chartData: getChartData,
  contentData: getTitleAndDescription
});
