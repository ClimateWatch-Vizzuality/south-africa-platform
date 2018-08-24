import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import { Line } from 'recharts';

class LineWithDots extends PureComponent {
  render() {
    const { column, color, animation } = this.props;
    return (
      <Line
        key={column.value}
        isAnimationActive={isUndefined(animation) ? true : animation}
        dot={{ strokeWidth: 0, fill: color, radius: 0.5 }}
        dataKey={column.value}
        stroke={color}
        strokeWidth={2}
        type="monotone"
      />
    );
  }
}

LineWithDots.propTypes = {
  column: PropTypes.shape({ value: PropTypes.string }).isRequired,
  color: PropTypes.string,
  animation: PropTypes.bool
};

LineWithDots.defaultProps = { color: '', animation: false };

export default LineWithDots;
