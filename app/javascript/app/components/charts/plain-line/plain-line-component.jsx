import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import { Line } from 'recharts';

class PlainLine extends PureComponent {
  render() {
    const { column, animation, color } = this.props;
    return (
      <Line
        key={column.value}
        isAnimationActive={isUndefined(animation) ? true : animation}
        dot={false}
        dataKey={column.value}
        stroke={color}
        strokeWidth={2}
        type="monotone"
      />
    );
  }
}

PlainLine.propTypes = {
  column: PropTypes.shape({ value: PropTypes.string }).isRequired,
  color: PropTypes.string,
  animation: PropTypes.bool
};

PlainLine.defaultProps = { color: '', animation: false };

export default PlainLine;
