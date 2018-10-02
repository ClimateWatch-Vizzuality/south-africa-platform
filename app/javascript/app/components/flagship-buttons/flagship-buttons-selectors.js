import { createStructuredSelector } from 'reselect';
import {
  getFlagshipSections,
  getFlagshipIdParam
} from 'selectors/flagship-programmes-selectors';

export const getFlagshipButtons = createStructuredSelector({
  sections: getFlagshipSections,
  selectedId: getFlagshipIdParam
});
