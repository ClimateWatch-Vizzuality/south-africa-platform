import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import kebabCase from 'lodash/kebabCase';
import { getPageSection } from 'selectors/flagship-programmes-selectors';

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
  data: renameDataColumns,
  defaultColumns: () => defaultColumns,
  pageSection: getPageSection
});
