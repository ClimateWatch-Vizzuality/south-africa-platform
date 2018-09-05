import React from 'react';
import { Rectangle, Layer } from 'recharts';
import { PropTypes } from 'prop-types';
import styles from './sankey-node-styles.scss';

function SankeyNode({ x, y, width, height, index, payload, containerWidth }) {
  const padding = 20;
  const isOut = x + width + padding > containerWidth;

  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={payload.color}
        fillOpacity="1"
      />
      <text
        textAnchor={isOut ? 'end' : 'start'}
        x={isOut ? x - padding : x + width + padding}
        y={y + height / 2}
        className={styles.nodeText}
      >
        {`${payload.name}: USD ${payload.value} m`}
      </text>
    </Layer>
  );
}

SankeyNode.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  index: PropTypes.number,
  payload: PropTypes.object,
  containerWidth: PropTypes.number
};

SankeyNode.defaultProps = {
  x: 0,
  y: 0,
  width: 20,
  height: 20,
  index: 0,
  payload: {},
  containerWidth: 100
};

export default SankeyNode;
