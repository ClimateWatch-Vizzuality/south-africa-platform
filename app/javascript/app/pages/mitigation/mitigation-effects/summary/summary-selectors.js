import { createSelector, createStructuredSelector } from 'reselect';
import { isEmpty, uniqBy, snakeCase } from 'lodash';

const VIS_TYPE_OPTIONS = [
  { label: 'Table', value: 'table' },
  { label: 'Bubble Chart', value: 'bubble-chart' }
];
const DEFAULT_THEME = 'energy_efficiency';
const CHART_COLORS = { selected: '#f5b335', default: '#ecf0f1' };
const ALL_SELECTED = 'All Selected';

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
  isEmpty(mitigationEffects.data) || isEmpty(mitigationEffects.data.data)
    ? null
    : mitigationEffects.data.data;
const getSummaryMeta = ({ mitigationEffects = {} }) =>
  isEmpty(mitigationEffects.data) || isEmpty(mitigationEffects.data.meta)
    ? null
    : mitigationEffects.data.meta;

const setBubbleColor = (selectedId, id) =>
  selectedId === id ? CHART_COLORS.selected : CHART_COLORS.default;
const setInitialColor = (slug, summary, isFirstElement) => {
  if (isFirstElement) return CHART_COLORS.selected;
  const selected = summary.find(s => snakeCase(s.name) === slug);
  return selected ? CHART_COLORS.default : CHART_COLORS.selected;
};

const getVisTypeOptions = createSelector([], () => VIS_TYPE_OPTIONS);

const getVisTypeSelected = createSelector(
  [ getVisTypeOptions, getVisTypeParam ],
  (visTypes, visType) => {
    if (!visTypes) return null;
    if (!visType) return visTypes[0];
    return visTypes.find(t => t.value === visType);
  }
);

const getThemeOptions = createSelector([ getSummaryData, getVisTypeSelected ], (
  summary,
  vizType
) =>
  {
    if (!summary) return null;
    const themeOptions = uniqBy(summary, 'theme').map(theme => ({
      label: theme.theme,
      value: snakeCase(theme.theme)
    }));
    if (vizType.value === 'table')
      themeOptions.unshift({ label: ALL_SELECTED, value: ALL_SELECTED });
    return themeOptions;
  });

const getThemeSelected = createSelector(
  [ getThemeOptions, getThemeParam, getVisTypeSelected ],
  (themes, theme, vizType) => {
    if (!themes) return null;
    const defaultTheme = vizType.value === 'table'
      ? ALL_SELECTED
      : DEFAULT_THEME;
    return themes.find(t => t.value === theme) ||
      themes.find(t => t.value === defaultTheme);
  }
);

const getGHGOptions = createSelector(
  [ getSummaryData, getSummaryMeta, getThemeSelected ],
  (data, meta, theme) => {
    if (!meta || isEmpty(meta) || !theme) return null;
    const selectedThemeData = data.filter(
      d => snakeCase(d.theme) === theme.value
    );
    const optionMeta = [];
    selectedThemeData.forEach(
      d => Object.keys(d).forEach(key => {
        const parsedValue = parseFloat(d[key], 10);
        if (
          key.startsWith('effects') &&
            parsedValue &&
            parsedValue !== 0 &&
            !Number.isNaN(parsedValue)
        ) {
          optionMeta.push(meta.find(m => m.code === key));
        }
      })
    );
    return uniqBy(
      optionMeta,
      'code'
    ).map(o => ({ label: o.indicator, value: snakeCase(o.indicator) }));
  }
);

const getEffectsIndicatorName = createSelector(
  [ getSummaryData, getSummaryMeta ],
  (data, meta) => {
    if (!meta || isEmpty(meta) || !data || isEmpty(data)) return null;
    const effectNames = {};
    Object.keys(data[0]).forEach(key => {
      if (key.startsWith('effects')) {
        const { indicator, unit } = meta.find(m => m.code === key);
        effectNames[key] = `${indicator}${unit ? ` (${unit})` : ''}`;
      }
    });
    return effectNames;
  }
);

const getTableData = createSelector(
  [ getSummaryData, getSummaryMeta, getEffectsIndicatorName, getThemeSelected ],
  (data, meta, effectNames, themeSelected) => {
    if (!meta || isEmpty(meta) || !effectNames) return null;
    const filteredData = themeSelected.label === ALL_SELECTED
      ? data
      : data.filter(d => d.theme === themeSelected.label);
    const tableData = filteredData.map(d => {
      const updatedD = {};
      Object.keys(d).forEach(key => {
        if (key.startsWith('effects')) {
          updatedD[effectNames[key]] = d[key];
        } else {
          updatedD[key] = d[key];
        }
      });
      return updatedD;
    });
    return { data: tableData, defaultColumns: Object.keys(tableData[0]) };
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
    const initialColor = (e, isFirstElement) =>
      setInitialColor(slug(e), summary, isFirstElement);
    const themeFilteredData = summary.filter(
      d => snakeCase(d.theme) === (themeSelected || DEFAULT_THEME)
    );
    const getColor = (e, i) =>
      selectedId
        ? setBubbleColor(selectedId, slug(e))
        : initialColor(e, i === 0);
    return themeFilteredData.map((e, i) => ({ ...e, color: getColor(e, i) }));
  }
);

const slug = e => e && snakeCase(e.name);

const parseChartData = createSelector(
  [ getChartData, getSummaryMeta, getGHGSelected ],
  (data, meta, GHGSelected) => {
    if (!data || !meta || isEmpty(meta) || !GHGSelected) return null;
    const metaInfo = meta.find(
      m => snakeCase(m.indicator) === GHGSelected.value
    );
    const parsedData = [];
    data.forEach(d => {
      const effectValue = parseFloat(d[metaInfo.code], 10);
      const value = Number.isNaN(effectValue) ? null : effectValue;
      if (value && value !== 0) {
        parsedData.push({
          theme: d.theme,
          id: slug(d),
          action: d.name,
          color: d.color,
          actor: d.coordinator,
          value,
          cautions: metaInfo.cautions,
          unit: metaInfo.unit,
          tooltipContent: [
            `${metaInfo.indicator}`,
            value
          ]
        });
      }
    });
    return parsedData.length ? parsedData : null;
  }
);

export const getSummarySelected = createSelector(
  [ parseChartData, getSummaryIdParam ],
  (data, summaryId) => {
    if (!data) return null;
    if (!summaryId) return data[0];
    return data.find(d => d.id === summaryId);
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
  tableData: getTableData,
  query: getQueryParams
});
