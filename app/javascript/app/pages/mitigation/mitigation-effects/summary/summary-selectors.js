import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty, uniqBy } from 'lodash';

const VIS_TYPE_OPTIONS = [
  { label: 'Bubble Chart', value: 'bubble-chart' },
  { label: 'Table', value: 'table' }
];

const getQueryParams = ({ location }) => location.query || null;
const getThemeParam = ({ location }) =>
  location.query ? location.query.theme : null;
const getVisTypeParam = ({ location }) =>
  location.query ? location.query.visType : null;
const getSummaryData = ({ mitigationEffects = {} }) =>
  isEmpty(mitigationEffects.data) ? null : mitigationEffects.data;

const getChartData = createSelector(getSummaryData, summary => {
  if (!summary) return null;
  return summary;
});

const getThemeOptions = createSelector(getSummaryData, summary => {
  if (!summary) return null;
  return uniqBy(
    summary,
    'theme'
  ).map(theme => ({ label: theme.theme, value: theme.theme }));
});

export const getThemeSelected = createSelector(
  [ getThemeOptions, getThemeParam ],
  (themes, theme) => {
    if (!themes) return null;
    if (!theme) return themes[0];
    return themes.find(t => t.value === theme);
  }
);
const getVisTypeOptions = createSelector([], () => VIS_TYPE_OPTIONS);

export const getVisTypeSelected = createSelector(
  [ getVisTypeOptions, getVisTypeParam ],
  (visTypes, visType) => {
    if (!visTypes) return null;
    if (!visType) return visTypes[0];
    return visTypes.find(t => t.value === visType);
  }
);

export const getSummary = createStructuredSelector({
  chartData: getChartData,
  themeOptions: getThemeOptions,
  themeSelected: getThemeSelected,
  visTypeOptions: getVisTypeOptions,
  visTypeSelected: getVisTypeSelected,
  query: getQueryParams
});
