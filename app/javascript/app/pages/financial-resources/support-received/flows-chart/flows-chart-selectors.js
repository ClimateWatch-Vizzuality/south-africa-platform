import { createStructuredSelector, createSelector } from 'reselect';
import { CHART_COLORS } from 'utils/graphs';
import uniq from 'lodash/uniq';

const getData = createSelector(state => state.data, data => data || null);
const getMeta = createSelector(state => state.meta, meta => meta || null);
const getFocus = (focusKeys, focusNames, d) => {
  const focus = [];
  focusKeys.forEach(k => {
    if (d[k]) {
      const focusIndex = parseInt(k.substr(-1), 10) - 1;
      focus.push(focusNames[focusIndex]);
    }
  });
  return focus;
};
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
  const focusKeys = data &&
    data[0] &&
    Object.keys(data[0]).filter(k => k.startsWith('focusArea'));

  data.forEach(d => {
    if (d.typeFunds && d.donor.name) {
      const source = nodes.indexOf(d.donor.name);
      const target = nodes.indexOf(d.typeFunds);
      const linkToUpdate = links.find(
        l => l.source === source && l.target === target
      );
      if (linkToUpdate) links.splice(links.indexOf(linkToUpdate), 1);
      const value = linkToUpdate && linkToUpdate.value + d.amountUsd ||
        d.amountUsd;
      links.push({
        source: nodes.indexOf(d.donor.name),
        target: nodes.indexOf(d.typeFunds),
        focus: getFocus(focusKeys, focusNames, d),
        value
      });
    }
  });
  return links;
};

const getfocusNames = meta => {
  const focusNames = [];
  meta.forEach(k => {
    if (k.code.startsWith('focus_area')) focusNames.push(k.indicator);
  });
  return focusNames;
};

const filterData = createSelector([ getData, getMeta ], (data, meta) => {
  if (!data) return null;
  const nodes = getNodes(data);
  const links = getLinks(data, nodes, getfocusNames(meta));
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
  const suffix = 'm';
  return { tooltip: { unit }, node: { unit, suffix } };
};

export const getFlowsChart = (data, meta) =>
  createStructuredSelector({
    data: () => addColorToData(data, meta),
    config: getConfig
  });
