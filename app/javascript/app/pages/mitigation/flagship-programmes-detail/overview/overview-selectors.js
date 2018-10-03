import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import kebabCase from 'lodash/kebabCase';
import { parseMarkdown } from 'utils/flagship-programmes';
import {
  getFlagshipSections,
  getFlagshipIdParam,
  getPageSection
} from 'selectors/flagship-programmes-selectors';

const getFlagshipData = ({ flagshipProgrammes = {} }) =>
  isEmpty(flagshipProgrammes.data) || isEmpty(flagshipProgrammes.data.data)
    ? null
    : flagshipProgrammes.data.data;
const getFlagshipId = ({ location = {} }) =>
  location.payload && location.payload.id || null;
const getFlagshipDetailData = createSelector(
  [ getFlagshipData, getFlagshipId ],
  (data, id) => {
    if (!data || !id) return null;
    return data.find(d => kebabCase(d.flagshipTheme.name) === id) || null;
  }
);

const parseWorkPackages = createSelector(getFlagshipDetailData, data => {
  if (!data) return null;
  const updatedData = { ...data };
  const parsedWorkPackage = parseMarkdown(data, 'workPackage');
  if (parsedWorkPackage) updatedData.workPackage = parsedWorkPackage;
  return updatedData;
});

export const getFlagshipDetailInfo = createStructuredSelector({
  flagshipDetailData: parseWorkPackages,
  sections: getFlagshipSections,
  selectedId: getFlagshipIdParam,
  pageSection: getPageSection
});
