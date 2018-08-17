import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import { METRIC_OPTIONS } from 'utils/data';

export const DEFAULT_AXES_CONFIG = {
  xBottom: { name: 'Year', unit: 'date', format: 'YYYY' },
  yLeft: { name: 'Emissions', unit: 'CO<sub>2</sub>e', format: 'number' }
};

export const getColumns = data =>
  Object.keys(data[0]).map(d => ({ label: data[0][d].label, value: d }));

export const getColumnValue = column => upperFirst(camelCase(column));
export const getYColumnValue = column => `y${getColumnValue(column)}`;

export const getTooltipConfig = columns => {
  const tooltip = {};
  columns.forEach(column => {
    tooltip[column.value] = { label: column.label };
  });
  return tooltip;
};

export const getMetricRatio = (selected, calculationData, x) => {
  if (!calculationData || !calculationData[x]) return 1;
  if (selected === METRIC_OPTIONS.PER_GDP.value) {
    // GDP is in dollars and we want to display it in million dollars
    return calculationData[x][0].gdp / 1000000;
  }
  if (selected === METRIC_OPTIONS.PER_CAPITA.value) {
    return calculationData[x][0].population;
  }
  return 1;
};
