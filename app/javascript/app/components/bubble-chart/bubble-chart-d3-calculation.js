import { pack, hierarchy } from 'd3';

export const chartDataCalculation = (width, data) => {
  const diameter = width - 10;
  const bubble = pack().size([ diameter, diameter ]).padding(1.5);
  const parsedData = { name: 'themes', children: data };
  const root = hierarchy(parsedData)
    .sum(function(d) {
      return d.value;
    })
    .sort(function(a, b) {
      return b.value - a.value;
    });
  return bubble(root);
};
