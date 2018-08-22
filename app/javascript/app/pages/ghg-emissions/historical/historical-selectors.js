import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import intersection from 'lodash/intersection';
import { METRIC_OPTIONS } from 'utils/data';
import {
  DEFAULT_AXES_CONFIG,
  getMetricRatio,
  getThemeConfig,
  getYColumnValue,
  getTooltipConfig
} from 'utils/graphs';

const { COUNTRY_ISO } = process.env;
const defaults = { gas: 'All GHG', source: 'CAIT' };
const excludedSectors = [ 'Total excluding LUCF', 'Total including LUCF' ];

const getMetaData = ({ metadata = {} }) =>
  metadata.ghg ? metadata.ghg.data : null;
const getQueryParams = ({ location }) => location.query || null;
const getMetricParam = ({ location }) =>
  location.query ? location.query.metric : null;
const getSectorParam = ({ location }) =>
  location.query ? location.query.sector : null;
const getWBData = ({ WorldBank }) => WorldBank.data[COUNTRY_ISO] || null;
const getEmissionsData = ({ GHGEmissions = {} }) =>
  isEmpty(GHGEmissions.data) ? null : GHGEmissions.data;

const getChartLoading = ({ metadata = {}, GHGEmissions = {} }) =>
  metadata.ghg.loading || GHGEmissions.loading;

const getGas = createSelector(getMetaData, meta => {
  if (!meta || !meta.gas) return null;
  const selected = meta.gas.find(gas => gas.label === defaults.gas);
  return selected.value || null;
});

const getSource = createSelector(getMetaData, meta => {
  if (!meta || !meta.dataSource) return null;
  const selected = meta.dataSource.find(
    source => source.label === defaults.source
  );
  return selected.value || null;
});

export const getEmissionsParams = createSelector([ getSource, getGas ], (
  source,
  gas
) =>
  {
    if (!source || !gas) return null;
    return { location: COUNTRY_ISO, gas, source };
  });

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

export const getDataSectors = createSelector([ getEmissionsData ], data => {
  if (!data) return null;
  return data.map(d => d.sector);
});

export const getSectorOptions = createSelector(
  [ getMetaData, getDataSectors ],
  (meta, dataSectors) => {
    if (!meta || !meta.sector || !dataSectors) return null;
    return meta.sector
      .filter(
        s => !excludedSectors.includes(s.label) && dataSectors.includes(s.label)
      )
      .map(d => ({ label: d.label, value: d.value }));
  }
);

export const getSectorSelected = createSelector(
  [ getSectorOptions, getSectorParam ],
  (sectors, sectorsSelected) => {
    if (!sectors) return null;
    if (!sectorsSelected) return sectors;
    const sectorsParsed = sectorsSelected.split(',').map(s => parseInt(s, 10));
    return sectors.filter(s => sectorsParsed.indexOf(s.value) > -1);
  }
);

const getCalculationData = createSelector([ getWBData ], data => {
  if (!data || !data.length) return null;
  return groupBy(data, 'year');
});

export const parseChartData = createSelector(
  [ getEmissionsData, getMetricSelected, getCalculationData ],
  (emissionsData, metricSelected, calculationData) => {
    if (!emissionsData) return null;
    const [ data ] = emissionsData;
    let xValues = data.emissions.map(d => d.year);
    if (
      calculationData &&
        metricSelected.value !== METRIC_OPTIONS.ABSOLUTE_VALUE.value
    ) {
      xValues = intersection(
        xValues,
        Object.keys(calculationData || []).map(y => parseInt(y, 10))
      );
    }
    const dataParsed = xValues.map(x => {
      const yItems = {};
      emissionsData.forEach(d => {
        const yKey = getYColumnValue(d.sector);
        const yData = d.emissions.find(e => e.year === x);
        const calculationRatio = getMetricRatio(
          metricSelected.value,
          calculationData,
          x
        );
        if (yData && yData.value) {
          // 1000000 is the data scale from the API
          yItems[yKey] = yData.value * 1000000 / calculationRatio;
        }
      });
      const item = { x, ...yItems };
      return item;
    });
    return dataParsed;
  }
);

export const getChartConfig = createSelector(
  [ getEmissionsData, getSectorSelected, getMetricSelected ],
  (data, sectorSelected, metricSelected) => {
    if (!data || !sectorSelected) return null;
    const sectorSelectedLabels = sectorSelected.map(s => s.label);
    const yColumns = data
      .filter(s => sectorSelectedLabels.includes(s.sector))
      .map(d => ({ label: d.sector, value: getYColumnValue(d.sector) }));
    const theme = getThemeConfig(yColumns);
    const tooltip = getTooltipConfig(yColumns);
    let { unit } = DEFAULT_AXES_CONFIG.yLeft;
    if (metricSelected.value === METRIC_OPTIONS.PER_GDP.value) {
      unit = `${unit}/ million $ GDP`;
    } else if (metricSelected.value === METRIC_OPTIONS.PER_CAPITA.value) {
      unit = `${unit} per capita`;
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

export const getChartFilters = createSelector([ getChartConfig ], config => {
  if (!config || !config.columns || !config.columns.y) return [];
  return config.columns.y.map(c => ({ label: c.label }));
});

export const getChartData = createStructuredSelector({
  data: parseChartData,
  config: getChartConfig,
  loading: getChartLoading,
  dataOptions: getChartFilters,
  dataSelected: getChartFilters
});

export const getTotalGHGEMissions = createStructuredSelector({
  sectorOptions: getSectorOptions,
  sectorSelected: getSectorSelected,
  metricOptions: getMetricOptions,
  metricSelected: getMetricSelected,
  emissionsParams: getEmissionsParams,
  chartData: getChartData,
  query: getQueryParams
});
