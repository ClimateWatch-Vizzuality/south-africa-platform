import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import { Area } from 'recharts';

class RangedArea extends PureComponent {
  render() {
    const { column, color, animation, fill } = this.props;
    return (
      <Area
        key={column.value}
        dataKey={column.value}
        dot={false}
        stroke={color}
        strokeWidth={2}
        isAnimationActive={isUndefined(animation) ? true : animation}
        fill={fill || ''}
        type="linear"
      />
    );
  }
}

RangedArea.propTypes = {
  column: PropTypes.shape({ value: PropTypes.string }).isRequired,
  color: PropTypes.string,
  fill: PropTypes.string,
  animation: PropTypes.bool
};

RangedArea.defaultProps = { color: '', fill: '', animation: false };

export default RangedArea;
