import { createStructuredSelector, createSelector } from 'reselect';
import { CHART_COLORS } from 'utils/graphs';
import uniq from 'lodash/uniq';
import { getFocus, getFocusNames } from 'utils/financial-resources';
import has from 'lodash/has';

// eslint-disable-next-line react/destructuring-assignment
const selectData = (state, props) => props.data || null;
const selectMeta = state =>
  has(state, 'financialResourcesReceived.data.meta') &&
    state.financialResourcesReceived.data.meta;
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
      // data is in USD and we want to display it in million USD
      if (d.amountUsd) {
        links.push({
          source,
          target,
          focus: getFocus(d, focusNames),
          value: d.amountUsd
        });
      }
    }
  });
  return links;
};

const filterData = createSelector([ selectData, selectMeta ], (data, meta) => {
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
  const scale = 1 / 1000000;
  const suffix = 'm';
  return { tooltip: { unit, scale, suffix }, node: { unit, scale, suffix } };
};

export const getFlowsChart = createStructuredSelector({
  data: addColorToData,
  config: getConfig
});
