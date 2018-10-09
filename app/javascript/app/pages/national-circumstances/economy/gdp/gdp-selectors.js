import { createSelector, createStructuredSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import intersection from 'lodash/intersection';
import { METRIC_OPTIONS } from 'utils/defaults';
import has from 'lodash/has';
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

const selectNationalCircumstances = ({ nationalCircumstances = {} }) => {
  if (!nationalCircumstances || !has(nationalCircumstances, 'data.data'))
    return null;
  return nationalCircumstances.data.data;
};

const filterGDPData = createSelector(selectNationalCircumstances, data => {
  if (!data) return null;
  return data.filter(d => d.name === 'GDP_usd');
});

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
  [ filterGDPData, getMetricSelected, getCalculationData ],
  (gdpData, metricSelected, calculationData) => {
    if (!gdpData) return null;
    const [ data ] = gdpData;
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
      gdpData.forEach(d => {
        const yKey = getYColumnValue('GDP');
        const yData = d.categoryYears.find(e => e.year === x);
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
  [ filterGDPData, getMetricSelected ],
  (data, metricSelected) => {
    if (!data) return null;
    const yColumns = [ { label: 'GDP', value: getYColumnValue('GDP') } ];
    const theme = yColumns.reduce(
      (acc, next) => ({
        ...acc,
        [next.value]: { stroke: '#00955f', fill: '#00955f' }
      }),
      {}
    );
    const tooltip = { ...getTooltipConfig(yColumns) };
    let unit = 'USD';
    if (metricSelected.value === METRIC_OPTIONS.PER_CAPITA.value) {
      unit = `${unit} per capita`;
    }
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
