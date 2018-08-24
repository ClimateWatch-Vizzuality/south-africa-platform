import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import { Line } from 'recharts';

class DotsLine extends PureComponent {
  render() {
    const { column, animation, color } = this.props;
    return (
      <Line
        key={column.value}
        isAnimationActive={isUndefined(animation) ? true : animation}
        dataKey={column.value}
        stroke={color}
        strokeDasharray="1,09"
        strokeWidth="5"
        strokeLinecap="round"
        type="monotone"
      />
    );
  }
}

DotsLine.propTypes = {
  column: PropTypes.shape({ value: PropTypes.string }).isRequired,
  color: PropTypes.string,
  animation: PropTypes.bool
};

DotsLine.defaultProps = { color: '#000000', animation: false };

export default DotsLine;
