import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getFlagshipIdParam = ({ location }) =>
  location.query && location.query.flagshipId || null;

const getFlagshipsData = ({ flagshipProgrammes = {} }) =>
  isEmpty(flagshipProgrammes.data) || isEmpty(flagshipProgrammes.data.data)
    ? null
    : flagshipProgrammes.data.data;

const getFlagshipSections = createSelector(getFlagshipsData, data => {
  if (!data) return null;
  return data.map(d => d.flagshipTheme);
});
export const getPrioritisedFlagshipProgrammes = createStructuredSelector({
  sections: getFlagshipSections,
  selectedId: getFlagshipIdParam
});
