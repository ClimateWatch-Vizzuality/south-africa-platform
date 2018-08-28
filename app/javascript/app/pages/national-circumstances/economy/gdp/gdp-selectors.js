import { createSelector, createStructuredSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import intersection from 'lodash/intersection';
import { METRIC_OPTIONS } from 'utils/defaults';
import {
  DEFAULT_AXES_CONFIG,
  getMetricRatio,
  getYColumnValue,
  getTooltipConfig
} from 'utils/graphs';

const { COUNTRY_ISO } = process.env;
const defaults = {
  gas: 'All GHG',
  source: 'CAIT',
  sector: 'Total excluding LUCF'
};
const getMetaData = ({ metadata = {} }) =>
  metadata.ghg ? metadata.ghg.data : null;
const getMetricParam = ({ location }) =>
  location.query ? location.query.metric : null;
const getWBData = ({ WorldBank }) => WorldBank.data[COUNTRY_ISO] || null;
const getGdpData = ({ GDP = {} }) =>
  isEmpty(GDP.data) ? null : uniqBy(GDP.data, 'value');

const getChartLoading = ({ metadata = {}, GDP = {} }) =>
  metadata.ghg.loading || GDP.loading;

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
const getSector = createSelector(getMetaData, meta => {
  if (!meta || !meta.sector) return null;
  const selected = meta.sector.find(source => source.label === defaults.sector);
  return selected.value || null;
});

export const getGdpParams = createSelector([ getSource, getGas, getSector ], (
  source,
  gas,
  sector
) =>
  {
    if (!source || !gas || !sector) return null;
    return { location: COUNTRY_ISO, gas, source, sector };
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

const getCalculationData = createSelector([ getWBData ], data => {
  if (!data || !data.length) return null;
  return groupBy(data, 'year');
});

export const parseChartData = createSelector(
  [ getGdpData, getMetricSelected, getCalculationData ],
  (gdpData, metricSelected, calculationData) => {
    if (!gdpData) return null;
    const [ data ] = gdpData;
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
      gdpData.forEach(d => {
        const yKey = getYColumnValue(data.gas);
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
  [ getGdpData, getMetricSelected ],
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

export const getChartData = createStructuredSelector({
  data: parseChartData,
  config: getChartConfig,
  loading: getChartLoading,
  dataOptions: getChartFilters,
  dataSelected: getChartFilterSelected
});

export const getGdp = createStructuredSelector({
  metricOptions: getMetricOptions,
  metricSelected: getMetricSelected,
  gdpParams: getGdpParams,
  chartData: getChartData
});
