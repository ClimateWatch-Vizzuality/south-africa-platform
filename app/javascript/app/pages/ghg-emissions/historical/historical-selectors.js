import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import uniq from 'lodash/uniq';
import has from 'lodash/has';
import intersection from 'lodash/intersection';
import { METRIC_OPTIONS } from 'utils/defaults';
import {
  DEFAULT_AXES_CONFIG,
  getThemeConfig,
  getMetricRatio,
  getYColumnValue,
  getTooltipConfig
} from 'utils/graphs';

import strippedLine from 'assets/icons/legend/stripped-line.svg';

const { COUNTRY_ISO } = process.env;
const defaults = { gas: 'All GHG', source: 'DEA2017b' };
const excludedSectors = [ 'Total including FOLU', 'Total excluding FOLU' ];
const excludedGases = [ 'TotalGHG' ];

const getMetaData = ({ metadata = {} }) =>
  metadata.ghg ? metadata.ghg.data : null;
const getQueryParams = ({ location }) => location.query || null;
const getMetricParam = ({ location }) =>
  location.query ? location.query.metric : null;
const getSectorParam = ({ location }) =>
  location.query ? location.query.sector : null;
const getGasParam = ({ location }) =>
  location.query ? location.query.gas : null;
const getWBData = ({ WorldBank }) => WorldBank.data[COUNTRY_ISO] || null;
const getEmissionsData = ({ GHGEmissions = {} }) =>
  isEmpty(GHGEmissions.data) ? null : GHGEmissions.data;

const getChartLoading = ({ metadata = {}, GHGEmissions = {} }) =>
  metadata.ghg.loading || GHGEmissions.loading;

const getDownloadUri = ({ metadata = {} }) => {
  const dataSources = has(metadata, 'ghg.data.dataSource') &&
    metadata.ghg.data.dataSource;
  const dataSource = dataSources &&
    dataSources.find(d => d.source === 'DEA2017b');
  const id = dataSource && dataSource.value;
  return id ? `emissions.csv?source=${id}&location=ZAF` : null;
};

const getSource = createSelector(getMetaData, meta => {
  if (!meta || !meta.dataSource) return null;
  const selected = meta.dataSource.find(
    source => source.label === defaults.source
  );
  return selected && selected.value || null;
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

export const getGasOptions = createSelector(
  getMetaData,
  meta => meta && meta.gas.filter(g => !excludedGases.includes(g.label)) || null
);

export const getGasSelected = createSelector([ getGasOptions, getGasParam ], (
  gasOptions,
  gasSelected
) =>
  {
    if (!gasOptions) return null;
    if (!gasSelected) {
      const defaultGas = gasOptions.find(g => g.label === defaults.gas);
      return defaultGas && [ defaultGas ] || null;
    }
    const gasParsed = gasSelected.split(',').map(s => parseInt(s, 10));
    return gasOptions.filter(s => gasParsed.indexOf(s.value) > -1);
  });

export const getSectorOptions = createSelector(
  [ getMetaData, getDataSectors ],
  (meta, dataSectors) => {
    if (!meta || !meta.sector || !dataSectors) return null;
    const sectors = meta.sector
      .filter(
        s =>
          !excludedSectors.includes(s.label) &&
            !s.parentId &&
            dataSectors.includes(s.label)
      )
      .map(d => ({
        label: d.label,
        value: d.value,
        groupParent: String(d.value)
      }));

    const subsectors = meta.sector
      .filter(
        s =>
          !excludedSectors.includes(s.label) &&
            s.parentId &&
            dataSectors.includes(s.label)
      )
      .map(d => ({
        label: d.label,
        value: d.value,
        group: String(d.parentId)
      }));
    return [ ...sectors, ...subsectors ];
  }
);

export const getSectorSelected = createSelector(
  [ getSectorOptions, getSectorParam ],
  (sectors, sectorsSelected) => {
    if (!sectors) return null;
    if (!sectorsSelected) return sectors.filter(s => s.groupParent);
    const sectorsParsed = sectorsSelected.split(',').map(s => parseInt(s, 10));
    return sectors.filter(s => sectorsParsed.indexOf(s.value) > -1);
  }
);

export const getSubSectorOptions = createSelector(
  [ getMetaData, getDataSectors, getSectorSelected ],
  (meta, dataSectors, selectedSector) => {
    if (!meta || !meta.sector || !dataSectors) return null;
    return meta.sector
      .filter(
        s =>
          selectedSector.map(ss => ss.value).includes(s.parentId) &&
            !excludedSectors.includes(s.label) &&
            dataSectors.includes(s.label)
      )
      .map(d => ({ label: d.label, value: d.value }));
  }
);

export const getEmissionsParams = createSelector(
  [ getSource, getGasSelected ],
  (source, gas) => {
    if (!source || !gas) return null;
    return { location: COUNTRY_ISO, gas: gas.map(g => g.value).join(), source };
  }
);

const getCalculationData = createSelector([ getWBData ], data => {
  if (!data || !data.length) return null;
  return groupBy(data, 'year');
});

const filterChartData = createSelector(
  [ getEmissionsData, getSectorSelected ],
  (data, sectorSelected) => {
    if (!data) return null;
    const sectorLabels = sectorSelected.map(s => s.label);
    return data.filter(d => sectorLabels.includes(d.sector));
  }
);
export const parseChartData = createSelector(
  [ filterChartData, getMetricSelected, getCalculationData ],
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

const getDataOptions = createSelector(
  [ getSectorOptions, getSubSectorOptions ],
  (sectors, subsectors) => {
    if (!sectors) return null;
    return sectors.concat(subsectors);
  }
);

const getDataSelected = getSectorSelected;

export const getChartConfig = createSelector(
  [ filterChartData, getMetaData, getSectorSelected, getMetricSelected ],
  (data, meta, sectorSelected, metricSelected) => {
    if (!data || !sectorSelected) return null;
    const sectorSelectedLabels = sectorSelected
      .filter(s => s.groupParent)
      .map(s => s.label);
    const getYOption = sectors =>
      uniq(sectors).map(s => ({ label: s, value: getYColumnValue(s) }));
    const yColumnSectors = [];
    const yColumnSubsectors = [];
    const subsectorParents = {};
    data.forEach(d => {
      if (d.emissions.some(y => y.value)) {
        if (sectorSelectedLabels.includes(d.sector)) {
          yColumnSectors.push(d.sector);
        } else {
          const subsector = d.sector;
          const { parentId } = meta.sector.find(s => s.label === subsector);
          const parentLabel = meta.sector.find(s => s.value === parentId).label;
          subsectorParents[d.sector] = parentLabel;
          yColumnSubsectors.push(d.sector);
        }
      }
    });
    const yColumnOptions = getYOption(yColumnSectors);
    const yColumnDotsOptions = getYOption(yColumnSubsectors).map(s => ({
      ...s,
      icon: strippedLine,
      label: `${subsectorParents[s.label]} - ${s.label}`
    }));
    const theme = {
      ...getThemeConfig([ ...yColumnOptions, ...yColumnDotsOptions ])
    };
    const tooltip = getTooltipConfig([
      ...yColumnOptions,
      ...yColumnDotsOptions
    ]);
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
      columns: {
        x: [ { label: 'year', value: 'x' } ],
        lines: yColumnOptions,
        dots: yColumnDotsOptions
      }
    };
  }
);

export const getChartData = createStructuredSelector({
  data: parseChartData,
  config: getChartConfig,
  loading: getChartLoading,
  dataOptions: getDataOptions,
  dataSelected: getDataSelected
});

export const getTotalGHGEMissions = createStructuredSelector({
  gasOptions: getGasOptions,
  gasSelected: getGasSelected,
  sectorOptions: getSectorOptions,
  sectorSelected: getSectorSelected,
  metricOptions: getMetricOptions,
  metricSelected: getMetricSelected,
  emissionsParams: getEmissionsParams,
  chartData: getChartData,
  query: getQueryParams,
  downloadUri: getDownloadUri
});
