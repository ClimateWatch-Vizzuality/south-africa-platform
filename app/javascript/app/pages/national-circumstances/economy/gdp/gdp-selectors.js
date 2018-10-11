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
const API_GDP_DATA_SCALE = 1000000000;
const { COUNTRY_ISO } = process.env;
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
      [ { yKey: 'USD', data }, { yKey: 'ZAR', data: ZARData } ].forEach(d => {
        const yKey = getYColumnValue(d.yKey);

        const yData = d.data.categoryYears.find(e => e.year === x);
        const calculationRatio = getMetricRatio(
          metricSelected.value,
          calculationData,
          x
        );
        if (yData && yData.value) {
          yItems[yKey] = round(
            yData.value * API_GDP_DATA_SCALE / calculationRatio,
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
    const yColumns = [ { label: 'USD', value: getYColumnValue('USD') } ];
    const theme = yColumns.reduce(
      (acc, next) => ({
        ...acc,
        [next.value]: { stroke: '#00955f', fill: '#00955f' }
      }),
      {}
    );
    let title = 'USD';
    let suffix = 'billion';
    let scale = 1 / API_GDP_DATA_SCALE;

    if (metricSelected.value === METRIC_OPTIONS.PER_CAPITA.value) {
      title = `${title} per capita`;
      suffix = '';
      scale = 1;
    }
    const tooltip = {
      title,
      scale,
      suffix,
      yGDP: { label: 'USD' },
      yZAR: { label: 'USD' }
    };
    const axes = {
      xBottom: DEFAULT_AXES_CONFIG.xBottom,
      yLeft: { name: 'USD', title }
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

export const getChartFilters = createSelector(() => [ { label: 'USD' } ]);

export const getChartFilterSelected = createSelector(() => [
  { label: 'USD' }
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
  chartData: getChartData
});
