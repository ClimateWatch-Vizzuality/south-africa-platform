import { createStructuredSelector } from 'reselect';
import { CHART_COLORS } from 'utils/graphs';

const data = {
  nodes: [
    { name: 'Germany' },
    { name: 'France' },
    { name: 'Loans' },
    { name: 'Grants' }
  ],
  links: [
    { source: 0, target: 2, value: 24.729 },
    { source: 1, target: 3, value: 15.597 },
    { source: 1, target: 3, value: 19.597 },
    { source: 0, target: 3, value: 57.597 }
  ]
};

export const getData = () => {
  const nodesWithColors = data.nodes.map((node, i) => ({
    ...node,
    color: CHART_COLORS[i % 10]
  }));
  return { ...data, nodes: nodesWithColors };
};

export const getTooltipConfig = () => {
  const unit = 'USD million';
  const focus = 'Mitigation, capacity building';
  return { unit, focus };
};

export const getInternational = createStructuredSelector({
  data: getData,
  tooltipConfig: getTooltipConfig
});
