import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

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
