import { createSelector, createStructuredSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import isEmpty from 'lodash/isEmpty';
import {
  DEFAULT_AXES_CONFIG,
  getYColumnValue,
  getTooltipConfig
} from 'utils/graphs';

const { COUNTRY_ISO } = process.env;
const defaults = {
  gas: 'All GHG',
  source: 'CAIT',
  sector: 'Total excluding LUCF'
};
const getMetaData = ({ GHGMeta = {} }) => GHGMeta.data || null;
const getEmissionsData = ({ GHGEmissions = {} }) =>
  isEmpty(GHGEmissions.data) ? null : uniqBy(GHGEmissions.data, 'value');

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

export const getEmissionsParams = createSelector(
  [ getSource, getGas, getSector ],
  (source, gas, sector) => {
    if (!source || !gas || !sector) return null;
    return { location: COUNTRY_ISO, gas, source, sector };
  }
);

export const parseChartData = createSelector(
  [ getEmissionsData ],
  emissionsData => {
    if (!emissionsData) return null;
    const [ data ] = emissionsData;
    const xValues = data.emissions.map(d => d.year);
    const dataParsed = xValues.map(x => {
      const yItems = {};
      emissionsData.forEach(d => {
        const yKey = getYColumnValue(data.gas);
        const yData = d.emissions.find(e => e.year === x);
        yItems[yKey] = yData.value;
      });
      const item = { x, ...yItems };
      return item;
    });
    return dataParsed;
  }
);

export const getChartConfig = createSelector([ getEmissionsData ], data => {
  if (!data) return null;
  const yColumns = data.map(d => ({
    label: d.gas,
    value: getYColumnValue(d.gas)
  }));
  const theme = yColumns.reduce(
    (acc, next) => ({
      ...acc,
      [next.value]: { stroke: '#00B4D2', fill: '#00B4D2' }
    }),
    {}
  );
  const tooltip = getTooltipConfig(yColumns);
  return {
    axes: DEFAULT_AXES_CONFIG,
    theme,
    tooltip,
    animation: false,
    columns: { x: [ { label: 'year', value: 'x' } ], y: yColumns }
  };
});

export const getChartData = createStructuredSelector({
  data: parseChartData,
  config: getChartConfig
});

export const getTotalGHGEMissions = createStructuredSelector({
  emissionsParams: getEmissionsParams,
  chartData: getChartData
});
