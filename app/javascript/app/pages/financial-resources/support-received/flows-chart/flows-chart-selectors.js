import { createStructuredSelector, createSelector } from 'reselect';
import { CHART_COLORS } from 'utils/graphs';
import uniq from 'lodash/uniq';

const getData = createSelector(props => props.data, data => data || null);

const getNodes = data => {
  const nodes = [];
  data.forEach(d => {
    nodes.push(d.donor.name);
    if (d.typeFunds) nodes.push(d.typeFunds);
  });
  return uniq(nodes);
};
const getLinks = (data, nodes) => {
  const links = [];
  data.forEach(d => {
    const source = nodes.indexOf(d.donor.name);
    const target = nodes.indexOf(d.typeFunds);
    if (d.typeFunds) {
      const linkToUpdate = links.find(
        l => l.source === source && l.target === target
      );
      if (linkToUpdate) links.splice(links.indexOf(linkToUpdate), 1);
      const value = linkToUpdate && linkToUpdate.value + d.amountUsd ||
        d.amountUsd;
      links.push({
        source: nodes.indexOf(d.donor.name),
        target: nodes.indexOf(d.typeFunds),
        value
      });
    }
  });
  return links;
};

const filterData = createSelector(getData, data => {
  if (!data) return null;
  const nodes = getNodes(data);
  const links = getLinks(data, nodes);
  return links.length > 0
    ? { nodes: nodes.map(n => ({ name: n })), links: getLinks(data, nodes) }
    : null;
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
  const focus = 'Mitigation, capacity building';
  return { tooltip: { unit, focus }, node: { unit, suffix } };
};

export const getFlowsChart = data =>
  createStructuredSelector({
    data: () => addColorToData(data),
    config: getConfig
  });
