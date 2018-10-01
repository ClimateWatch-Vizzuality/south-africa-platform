import { createStructuredSelector, createSelector } from 'reselect';
import { CHART_COLORS } from 'utils/graphs';
import uniq from 'lodash/uniq';
import { getFocus, getFocusNames } from 'utils/financial-resources';

const getData = createSelector(state => state.data, data => data || null);
const getMeta = createSelector(state => state.meta, meta => meta || null);

const getNodes = data => {
  const nodes = [];
  data.forEach(d => {
    if (d.donor.name) nodes.push(d.donor.name);
    if (d.typeFunds) nodes.push(d.typeFunds);
  });
  return uniq(nodes);
};

const getLinks = (data, nodes, focusNames) => {
  const links = [];
  data.forEach(d => {
    if (d.typeFunds && d.donor.name) {
      const source = nodes.indexOf(d.donor.name);
      const target = nodes.indexOf(d.typeFunds);
      links.push({
        source,
        target,
        focus: getFocus(d, focusNames),
        value: Math.round(d.amountUsd / 1000000 * 100) / 100
      });
    }
  });
  return links;
};

const filterData = createSelector([ getData, getMeta ], (data, meta) => {
  if (!data) return null;
  const nodes = getNodes(data);
  const links = getLinks(data, nodes, getFocusNames(meta));
  if (!links.length) return null;
  return { nodes: nodes.map(n => ({ name: n })), links };
});

export const addColorToData = createSelector(filterData, data => {
  if (!data || !data.nodes) return null;
  const nodesWithColors = data.nodes.map((node, i) => ({
    ...node,
    color: CHART_COLORS[i % 10]
  }));
  return { ...data, nodes: nodesWithColors };
});

export const getConfig = () => {
  const unit = 'USD million';
  return { tooltip: { unit }, node: { unit } };
};

export const getFlowsChart = (data, meta) =>
  createStructuredSelector({
    data: () => addColorToData(data, meta),
    config: getConfig
  });
