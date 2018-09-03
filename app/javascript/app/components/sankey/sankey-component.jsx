import React from 'react';
import { PropTypes } from 'prop-types';
import { Sankey, Tooltip } from 'recharts';
import SankeyTooltip from './sankey-tooltip';
import SankeyNode from './sankey-node';

function SankeyChart(
  { width, height, nodeWidth, nodePadding, containerWidth, data, tooltipConfig }
) {
  return (
    <Sankey
      width={width}
      height={height}
      data={data}
      nodeWidth={nodeWidth}
      nodePadding={nodePadding}
      node={<SankeyNode containerWidth={containerWidth} />}
    >
      {
        tooltipConfig
          ? (
            <Tooltip
              content={content => (
                <SankeyTooltip content={content} config={tooltipConfig} />
            )}
            />
)
          : <Tooltip />
      }
    </Sankey>
  );
}

SankeyChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.object,
  nodeWidth: PropTypes.number,
  nodePadding: PropTypes.number,
  containerWidth: PropTypes.number,
  tooltipConfig: PropTypes.object
};

SankeyChart.defaultProps = {
  width: 960,
  height: 500,
  data: {},
  nodeWidth: 10,
  nodePadding: 60,
  containerWidth: 960,
  tooltipConfig: null
};

export default SankeyChart;
