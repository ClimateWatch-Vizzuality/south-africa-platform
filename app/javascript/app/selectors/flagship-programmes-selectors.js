import { createSelector } from 'reselect';
import { FLAGSHIP_NAMES } from 'constants/flagships';
import isEmpty from 'lodash/isEmpty';
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
    if (location.query && location.query.flagshipId)
      return String(location.query.flagshipId);
    return String(data[0].position);
  }
);

export const getSelectedSection = createSelector(
  [ getFlagshipSections, getFlagshipIdParam ],
  (sections, id) => {
    if (!sections) return null;
    return sections.find(s => s.position === parseInt(id, 10)) || sections[0];
  }
);
