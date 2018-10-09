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
    const DISASTER_CODES = [ 'Flood_demage', 'Drough_demage', 'Fire_demage' ];
    return data
      .filter(d => DISASTER_CODES.includes(d.code))
      .map(d => ({ title: d.location.name, description: d.value }));
  }
);

export const getNaturalDisastersData = createStructuredSelector({
  naturalDisastersData: filterNaturalDisasters
});
