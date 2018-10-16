import { createSelector, createStructuredSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import intersection from 'lodash/intersection';
import { METRIC_OPTIONS } from 'utils/defaults';
import {
  DEFAULT_AXES_CONFIG,
  CHART_COLORS,
  getMetricRatio,
  getYColumnValue,
  getTooltipConfig
} from 'utils/graphs';

const { COUNTRY_ISO } = process.env;
const getMetaData = ({ metadata = {} }) =>
  metadata.ghg ? metadata.ghg.data : null;
const getQueryParams = ({ location }) => location.query || null;
const getMetricParam = ({ location }) =>
  location.query ? location.query.metric : null;
const getDataSourceParam = ({ location }) =>
  location.query ? parseInt(location.query.dataSource, 10) : null;
const getWBData = ({ WorldBank }) => WorldBank.data[COUNTRY_ISO] || null;
const selectNationalCircumstances = ({ nationalCircumstances = {} }) =>
  nationalCircumstances && nationalCircumstances.data || null;
const getSectorSelection = ({ location }) =>
  location.query ? location.query.sector : null;
const getChartTypeSelection = ({ location }) =>
  location.query ? location.query.chartType : null;
const getEnergyMeta = createSelector(
  selectNationalCircumstances,
  nationalCircumstances => {
    if (!nationalCircumstances || !nationalCircumstances.meta) return null;
    return nationalCircumstances.meta.filter(
      m => m.code.startsWith('En_supply')
    );
  }
);

const getEnergyData = createSelector(
  [ selectNationalCircumstances, getEnergyMeta ],
  (nationalCircumstances, meta) => {
    if (!nationalCircumstances || !meta) return null;
    const data = [];
    nationalCircumstances.data.forEach(d => {
      if (d.name.startsWith('En_supply')) {
        const metaD = meta.find(m => m.code === d.name);
        if (metaD.indicator === 'Energy supply by source') {
          data.push({
            category: metaD.category,
            unit: metaD.unit,
            categoryYears: d.categoryYears
          });
        }
      }
    });
    return data;
  }
);

const getChartLoading = ({ nationalCircumstances = {} }) =>
  nationalCircumstances.loading;

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

export const getDataSourceOptions = createSelector([ getMetaData ], meta => {
  if (!meta || !meta.dataSource) return null;
  return meta.dataSource.map(d => ({ label: d.label, value: d.value }));
});

export const getDataSourceSelected = createSelector(
  [ getDataSourceOptions, getDataSourceParam ],
  (dataSources, dataSource) => {
    if (!dataSources) return null;
    if (!dataSource) return dataSources[0];
    return dataSources.find(m => m.value === dataSource);
  }
);

const getCalculationData = createSelector([ getWBData ], data => {
  if (!data || !data.length) return null;
  return groupBy(data, 'year');
});

export const filterDataBySource = createSelector(
  [ getEnergyData, getSectorSelection ],
  (data, sourceSelected) => {
    if (!data || isEmpty(data)) return null;
    if (!sourceSelected) return data;
    return data.filter(d => sourceSelected.split(',').includes(d.category));
  }
);

const getSourceOptions = createSelector(
  getEnergyData,
  data => data && data.map(d => ({ label: d.category, value: d.category }))
);
const getSectorSelected = createSelector(
  [ getSourceOptions, getSectorSelection ],
  (sources, sourceSelected) => {
    if (!sources) return null;
    if (!sourceSelected) return sources;
    const sourceParsed = sourceSelected.split(',');
    return sources.filter(s => sourceParsed.indexOf(s.value) > -1);
  }
);

const getChartTypeOptions = () => [
  { label: 'Line chart', value: 'line' },
  { label: 'Stacked area chart', value: 'area' },
  { label: 'Percentage chart', value: 'percentage' }
];

const getChartTypeSelected = createSelector(
  [ getChartTypeOptions, getChartTypeSelection ],
  (chartTypeOptions, chartTypeSelected) => {
    if (!chartTypeOptions) return null;
    if (!chartTypeSelected) return chartTypeOptions[0];
    return chartTypeOptions.find(s => s.value === chartTypeSelected);
  }
);

export const parseChartData = createSelector(
  [
    filterDataBySource,
    getMetricSelected,
    getCalculationData,
    getChartTypeSelected
  ],
  (data, metricSelected, calculationData, chartType) => {
    if (!data || isEmpty(data)) return null;
    const isPercentageChart = chartType.value === 'Percentage chart';
    let xValues = data[0].categoryYears.map(d => d.year);
    if (
      !isPercentageChart &&
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
      data.forEach(d => {
        const yKey = getYColumnValue(d.category);
        const yData = d.categoryYears.find(e => e.year === x);
        const calculationRatio = isPercentageChart
          ? 1
          : getMetricRatio(metricSelected.value, calculationData, x);
        if (yData && yData.value) {
          // 1000 is the data scale from the API, from MJ to J
          yItems[yKey] = yData.value * 1000 / calculationRatio;
        }
      });
      const item = { x, ...yItems };
      return item;
    });
    return dataParsed;
  }
);

export const getChartConfig = createSelector(
  [ getEnergyData, getMetricSelected ],
  (data, metricSelected) => {
    if (!data) return null;
    const yColumns = data.map(d => ({
      label: d.category,
      value: getYColumnValue(d.category)
    }));
    const theme = yColumns.reduce(
      (acc, next, i) => ({
        ...acc,
        [next.value]: {
          stroke: CHART_COLORS[i % 10],
          fill: CHART_COLORS[i % 10]
        }
      }),
      {}
    );
    const tooltip = getTooltipConfig(yColumns);
    let unit = '';
    if (metricSelected.value === METRIC_OPTIONS.PER_GDP.value) {
      unit = `Joules per million $`;
    } else if (metricSelected.value === METRIC_OPTIONS.PER_CAPITA.value) {
      unit = `Joules per capita`;
    }
    const axes = {
      ...DEFAULT_AXES_CONFIG,
      yLeft: { ...DEFAULT_AXES_CONFIG.yLeft, unit, suffix: 'J' }
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

export const getChartData = createStructuredSelector({
  data: parseChartData,
  config: getChartConfig,
  loading: getChartLoading,
  dataOptions: getSourceOptions,
  dataSelected: getSectorSelected
});

export const getTotalGHGEMissions = createStructuredSelector({
  chartTypeOptions: getChartTypeOptions,
  chartTypeSelected: getChartTypeSelected,
  metricOptions: getMetricOptions,
  metricSelected: getMetricSelected,
  chartData: getChartData,
  query: getQueryParams
});
