import { createStructuredSelector } from 'reselect';
import {
  getFlagshipSections,
  getFlagshipIdParam,
  getSelectedSection
} from 'selectors/flagship-programmes-selectors';

export const getPrioritisedFlagshipProgrammes = createStructuredSelector({
  sections: getFlagshipSections,
  selectedId: getFlagshipIdParam,
  selectedSection: getSelectedSection
});
