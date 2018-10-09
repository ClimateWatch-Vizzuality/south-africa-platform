import { createStructuredSelector, createSelector } from 'reselect';
import has from 'lodash/has';

const selectNaturalDisastersData = ({ naturalDisastersData = {} }) => {
  if (!naturalDisastersData || !has(naturalDisastersData, 'data.data'))
    return null;
  return naturalDisastersData.data.data;
};

const filterNaturalDisasters = createSelector(
  selectNaturalDisastersData,
  data => {
    if (!data) return null;
    const DISASTER_CODES = [ 'Flood', 'Drough', 'Fire' ];
    return data
      .filter(d => DISASTER_CODES.some(c => d.code.startsWith(c)))
      .map(d => ({ title: d.location.name, description: d.value }));
  }
);

export const getNaturalDisastersData = createStructuredSelector({
  naturalDisastersData: filterNaturalDisasters
});
