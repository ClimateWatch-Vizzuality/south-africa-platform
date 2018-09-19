import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty, uniqBy, snakeCase } from 'lodash';

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
const getGHGParam = ({ location }) =>
  location.query ? location.query.ghgEmissionsReduction : null;
const getSummaryIdParam = ({ location }) =>
  location.query ? location.query.summaryId : null;
const getSummaryData = ({ mitigationEffects = {} }) =>
  isEmpty(mitigationEffects.data['mitigation::MitigationEffects'])
    ? null
    : mitigationEffects.data['mitigation::MitigationEffects'];
const getSummaryMeta = ({ mitigationEffects = {} }) =>
  isEmpty(mitigationEffects.data) || isEmpty(mitigationEffects.data.meta)
    ? null
    : mitigationEffects.data.meta;

const setBubbleColor = (selectedId, id) =>
  selectedId === id ? CHART_COLORS.selected : CHART_COLORS.default;
const setInitialColor = (slug, summary, themeSelected = DEFAULT_THEME) =>
  slug === snakeCase(summary.filter(s => s.theme === themeSelected)[0].name)
    ? CHART_COLORS.selected
    : CHART_COLORS.default;

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

const getGHGOptions = createSelector(getSummaryMeta, meta => {
  if (!meta) return null;

  const effectMeta = meta.filter(m => m.code.startsWith('effects'));
  return effectMeta.map(o => ({ label: o.indicator, value: o.code }));
});

export const getVisTypeSelected = createSelector(
  [ getVisTypeOptions, getVisTypeParam ],
  (visTypes, visType) => {
    if (!visTypes) return null;
    if (!visType) return visTypes[0];
    return visTypes.find(t => t.value === visType);
  }
);

export const getGHGSelected = createSelector([ getGHGOptions, getGHGParam ], (
  options,
  selected
) =>
  {
    if (!options) return null;
    if (!selected) return options[0];
    return options.find(t => t.value === selected);
  });

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
            ? setBubbleColor(selectedId, slug(e))
            : setInitialColor(e, summary)
        }));
    }
    return summary
      .filter(s => s.theme === themeSelected)
      .map(e => ({
        ...e,
        color: selectedId
          ? setBubbleColor(selectedId, slug(e))
          : setInitialColor(slug(e), summary, themeSelected)
      }));
  }
);

const slug = e => e && snakeCase(e.name);

const parseChartData = createSelector(
  [ getChartData, getSummaryMeta, getGHGSelected ],
  (data, meta, GHGSelected) => {
    if (!data || !meta || isEmpty(meta) || !GHGSelected) return null;

    const parsedData = data.map(d => {
      const effectKey = GHGSelected.value.replace('_', '');
      const effectNumber = effectKey.replace('effects', '');
      const effectValue = parseInt(d[effectKey], 10);
      const value = Number.isNaN(effectValue) ? null : effectValue;
      const metaInfo = meta.find(m => m.code === `effects_${effectNumber}`);
      return {
        theme: d.theme,
        id: slug(d),
        action: d.name,
        color: d.color,
        actor: d.coordinator,
        value,
        cautions: metaInfo.cautions,
        unit: metaInfo.unit
      };
    });
    return parsedData;
  }
);

export const getSummarySelected = createSelector(
  [ parseChartData, getSummaryIdParam ],
  (data, summaryId) => {
    if (!data) return null;
    if (!summaryId) return data[0];
    return data.find(d => snakeCase(d.name) === summaryId);
  }
);

export const getSummary = createStructuredSelector({
  chartData: parseChartData,
  summarySelected: getSummarySelected,
  themeOptions: getThemeOptions,
  themeSelected: getThemeSelected,
  visTypeOptions: getVisTypeOptions,
  visTypeSelected: getVisTypeSelected,
  GHGOptions: getGHGOptions,
  GHGSelected: getGHGSelected,
  tableData: getSummaryData,
  query: getQueryParams
});
