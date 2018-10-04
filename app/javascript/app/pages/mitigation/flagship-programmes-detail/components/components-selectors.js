import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import kebabCase from 'lodash/kebabCase';
import { getPageSection } from 'selectors/flagship-programmes-selectors';
import { parseMarkdownToHtml } from 'utils/flagship-programmes';

const getFlagshipData = ({ flagshipProgrammes = {} }) =>
  isEmpty(flagshipProgrammes.data) || isEmpty(flagshipProgrammes.data.data)
    ? null
    : flagshipProgrammes.data.data;

const getFlagshipId = ({ location = {} }) =>
  location.payload && location.payload.id || null;

const getFlagshipComponentsData = createSelector(
  [ getFlagshipData, getFlagshipId ],
  (data, id) => {
    if (!data || !id) return null;
    const selectedData = data.find(
      d => kebabCase(d.flagshipTheme.name) === id
    ) ||
      null;
    if (!selectedData) return null;
    return selectedData.flagshipComponents;
  }
);

const renameDataColumns = createSelector(
  [ getFlagshipComponentsData ],
  data => {
    if (!data) return null;
    data.slice().map(d => {
      const updatedD = d;
      updatedD.main_activities = d.mainActivities;
      updatedD.next_steps = d.nextSteps;
      updatedD.component = d.name;
      return updatedD;
    });
    return data;
  }
);

const parseMarkdown = createSelector([ renameDataColumns ], data => {
  if (!data) return null;
  return data.slice().map(d => {
    const updatedD = d;
    Object.keys(d).forEach(key => {
      if (d[key] && String(d[key]).startsWith('"')) {
        updatedD[key] = parseMarkdownToHtml(String(d[key]));
      }
    });
    return updatedD;
  });
});

const defaultColumns = [
  'component',
  'main_activities',
  'lead',
  'status',
  'milestone',
  'barriers',
  'next_steps',
  'timeframe',
  'support'
];

export const getFlagshipComponents = createStructuredSelector({
  data: parseMarkdown,
  defaultColumns: () => defaultColumns,
  pageSection: getPageSection
});
