import { createStructuredSelector, createSelector } from 'reselect';
import { CHART_COLORS } from 'utils/graphs';
import uniq from 'lodash/uniq';
import isArray from 'lodash/isArray';
import groupBy from 'lodash/groupBy';
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

const aggregateByFocus = data => {
  const groupedData = groupBy(data, d => [ d.source, d.target, d.focus ]);
  const aggregatedData = Object.keys(groupedData).map(key => {
    const groupedD = groupedData[key];
    if (!isArray(groupedD)) return groupedD;
    return {
      ...groupedD[0],
      value: groupedD.reduce(
        (acc, v) => !Number.isNaN(v.value) ? acc + v.value : acc,
        0
      )
    };
  });
  return aggregatedData;
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
          value: d.amountUsd,
          timeframes: d.timeframes
        });
      }
    }
  });
  return links;
};

const filterData = createSelector([ selectData, selectMeta ], (data, meta) => {
  if (!data) return null;
  const nodes = getNodes(data);
  const links = aggregateByFocus(getLinks(data, nodes, getFocusNames(meta)));
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
  const format = '.1~f';
  return { tooltip: { unit, scale, format }, node: { unit, scale, format } };
};

export const getFlowsChart = createStructuredSelector({
  data: addColorToData,
  config: getConfig
});
