import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty, uniqBy } from 'lodash';

const VIS_TYPE_OPTIONS = [
  { label: 'Bubble Chart', value: 'bubble-chart' },
  { label: 'Table', value: 'table' }
];
const DEFAULT_THEME = 'Energy Efficiency';
const CHART_COLORS = { selected: '#f5b335', default: '#ecf0f1' };

const getQueryParams = ({ location }) => location.query || null;
const getThemeParam = ({ location }) =>
  location.query ? location.query.theme : null;
const getVisTypeParam = ({ location }) =>
  location.query ? location.query.visType : null;
const getSummaryIdParam = ({ location }) =>
  location.query ? location.query.summaryId : null;
const getSummaryData = ({ mitigationEffects = {} }) =>
  isEmpty(mitigationEffects.data) ? null : mitigationEffects.data;

const setBubbleColor = (selectedId, id) =>
  selectedId === id ? CHART_COLORS.selected : CHART_COLORS.default;
const setInitialColor = (e, summary, themeSelected = DEFAULT_THEME) =>
  e.id === summary.filter(s => s.theme === themeSelected)[0].id
    ? CHART_COLORS.selected
    : CHART_COLORS.default;

const getChartData = createSelector(
  [ getSummaryData, getThemeParam, getSummaryIdParam ],
  (summary, themeSelected, selectedId) => {
    if (!summary) return null;
    if (!themeSelected) {
      return summary
        .filter(s => s.theme === DEFAULT_THEME)
        .map(e => ({
          ...e,
          color: selectedId
            ? setBubbleColor(selectedId, e.id)
            : setInitialColor(e, summary)
        }));
    }
    return summary
      .filter(s => s.theme === themeSelected)
      .map(e => ({
        ...e,
        color: selectedId
          ? setBubbleColor(selectedId, e.id)
          : setInitialColor(e, summary, themeSelected)
      }));
  }
);

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

export const getSummarySelected = createSelector(
  [ getChartData, getSummaryIdParam ],
  (data, summaryId) => {
    if (!data) return null;
    if (!summaryId) return data[0];
    return data.find(d => d.id === parseInt(summaryId, 10));
  }
);

export const getSummary = createStructuredSelector({
  chartData: getChartData,
  summarySelected: getSummarySelected,
  themeOptions: getThemeOptions,
  themeSelected: getThemeSelected,
  visTypeOptions: getVisTypeOptions,
  visTypeSelected: getVisTypeSelected,
  tableData: getSummaryData,
  query: getQueryParams
});
