import { feature } from 'topojson-client';

import topojson from 'app/data/south-africa-topo.json';

export const southAfricaPaths = feature(
  topojson,
  topojson.objects[Object.keys(topojson.objects)[0]]
).features;
