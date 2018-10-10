import { createSelector, createStructuredSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import intersection from 'lodash/intersection';
import has from 'lodash/has';
import {
  DEFAULT_AXES_CONFIG,
  getMetricRatio,
  getYColumnValue
} from 'utils/graphs';
import round from 'lodash/round';

const METRIC_OPTIONS = {
  ABSOLUTE_VALUE: { label: 'Absolute value', value: 'ABSOLUTE_VALUE' },
  PER_CAPITA: { label: 'per Capita', value: 'PER_CAPITA' }
};
const API_GDP_DATA_SCALE = 1000000;
const API_POPULATION_DATA_SCALE = 1000;
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

const selectNationalCircumstances = ({ nationalCircumstances = {} }) => {
  if (!nationalCircumstances || !has(nationalCircumstances, 'data.data'))
    return null;
  return nationalCircumstances.data.data;
};

const getChartLoading = ({ WorldBank = {}, nationalCircumstances = {} }) =>
  WorldBank.loading || nationalCircumstances.loading;

const filterGDPData = createSelector(selectNationalCircumstances, data => {
  if (!data) return null;
  return {
    USD: data.find(d => d.name === 'GDP_usd'),
    ZAR: data.find(d => d.name === 'GDP_rand')
  };
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

export const getGdpParams = createSelector([ getSource, getSector ], (
  source,
  sector
) =>
  {
    if (!source || !sector) return null;
    return { location: COUNTRY_ISO, source, sector };
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
  [ filterGDPData, getMetricSelected, getCalculationData ],
  (gdpData, metricSelected, calculationData) => {
    if (!gdpData || !gdpData.USD) return null;
    const data = gdpData.USD;
    const ZARData = gdpData.ZAR;
    let xValues = data.categoryYears.map(d => d.year);
    // year and value, gas, source, sector, location, gwp
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
      [ { yKey: 'GDP', data }, { yKey: 'ZAR', data: ZARData } ].forEach(d => {
        const yKey = getYColumnValue(d.yKey);

        const yData = d.data.categoryYears.find(e => e.year === x);
        const calculationRatio = getMetricRatio(
          metricSelected.value,
          calculationData,
          x
        );
        const scaledCalculationRatio = calculationRatio !== 1
          ? calculationRatio / (API_GDP_DATA_SCALE * API_POPULATION_DATA_SCALE)
          : 1;
        if (yData && yData.value) {
          yItems[yKey] = round(
            yData.value * API_GDP_DATA_SCALE / scaledCalculationRatio,
            2
          );
          yItems[yKey] = round(
            yData.value * API_GDP_DATA_SCALE / scaledCalculationRatio,
            2
          );
        }
      });
      const item = { x, ...yItems };
      return item;
    });
    return dataParsed;
  }
);

export const getChartConfig = createSelector(
  [ filterGDPData, getMetricSelected ],
  (data, metricSelected) => {
    if (!data || !data.USD) return null;
    const yColumns = [ { label: 'GDP', value: getYColumnValue('GDP') } ];
    const theme = yColumns.reduce(
      (acc, next) => ({
        ...acc,
        [next.value]: { stroke: '#00955f', fill: '#00955f' }
      }),
      {}
    );
    let unit = 'USD';
    let suffix = 'billion';
    const scale = 1 / API_GDP_DATA_SCALE;

    if (metricSelected.value === METRIC_OPTIONS.PER_CAPITA.value) {
      unit = `${unit} per capita`;
      suffix = '';
    }
    const tooltip = {
      unit,
      scale,
      suffix,
      yGDP: { label: 'GDP' },
      yZAR: { label: 'GDP' }
    };
    const axes = {
      xBottom: DEFAULT_AXES_CONFIG.xBottom,
      yLeft: { name: 'GDP', unit, format: 'number' }
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

export const getChartFilters = createSelector(() => [ { label: 'GDP' } ]);

export const getChartFilterSelected = createSelector(() => [
  { label: 'GDP' }
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
