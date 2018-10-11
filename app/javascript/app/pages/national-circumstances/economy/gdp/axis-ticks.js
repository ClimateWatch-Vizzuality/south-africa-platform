import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';

const getYLabelformat = value => `${format('~s')(value).replace('G', 'B')}`;

export const CustomYAxisTick = ({ index, x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="0"
      y="0"
      dy="0"
      textAnchor="end"
      stroke="#b1b1c1"
      strokeWidth="0.5"
      fontSize="13px"
    >
      {
        index === 0 &&
          (payload.value === 0 || payload.value < 0 && payload.value > -0.001)
          ? '0'
          : getYLabelformat(payload.value)
      }
    </text>
  </g>
);

CustomYAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  index: PropTypes.number,
  payload: PropTypes.object
};

CustomYAxisTick.defaultProps = { x: null, y: null, index: null, payload: {} };

CustomYAxisTick.defaultProps = {};
