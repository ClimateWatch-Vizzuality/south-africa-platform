import { createSelector } from 'reselect';
import { FLAGSHIP_NAMES } from 'constants/flagships';
import isEmpty from 'lodash/isEmpty';
import kebabCase from 'lodash/kebabCase';
import { parseMarkdown } from 'utils/flagship-programmes';

const getFlagshipsData = ({ flagshipProgrammes = {} }) =>
  isEmpty(flagshipProgrammes.data) || isEmpty(flagshipProgrammes.data.data)
    ? null
    : flagshipProgrammes.data.data;

export const getFlagshipSections = createSelector(getFlagshipsData, data => {
  if (!data) return null;
  return data.map(d => ({
    ...d.flagshipTheme,
    shortName: FLAGSHIP_NAMES[d.flagshipTheme.position - 1],
    subPrograms: parseMarkdown(d, 'subPrograms')
  }));
});

export const getFlagshipIdParam = createSelector(
  [ state => state.location, getFlagshipsData ],
  (location, data) => {
    if (!data) return null;
    if (location.query && location.query.id) return location.query.id;
    if (location.payload && location.payload.id) return location.payload.id;
    return kebabCase(data[0].flagshipTheme.name);
  }
);

export const getSelectedSection = createSelector(
  [ getFlagshipSections, getFlagshipIdParam ],
  (sections, id) => {
    if (!sections) return null;
    return sections.find(s => kebabCase(s.name) === id) || sections[0];
  }
);

export const getPageSection = ({ location }) =>
  location.payload && location.payload.section || null;
