import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getDistributionByAgeData = ({ DistributionByAge = {} }) =>
  isEmpty(DistributionByAge.data) ? null : DistributionByAge.data;

const getData = createSelector(getDistributionByAgeData, data => {
  if (!data) return null;

  const barChartData = data.data;

  return barChartData;
});

const getConfig = createSelector(getDistributionByAgeData, data => {
  if (!data) return null;

  const { config } = data;

  return config;
});

const getDomain = createSelector(getDistributionByAgeData, data => {
  if (!data) return null;

  const { domain } = data;

  return domain;
});

export const getDummyData = createStructuredSelector({
  data: getData,
  config: getConfig,
  domain: getDomain
});
