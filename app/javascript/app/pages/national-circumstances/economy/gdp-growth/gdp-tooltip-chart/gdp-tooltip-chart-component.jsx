import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { format } from 'd3-format';
import cx from 'classnames';

import styles from './gdp-tooltip-chart-styles.scss';

class GdpTooltipChart extends PureComponent {
  sortByValue = payload => {
    const yValues = payload[0].payload;
    const compare = (a, b) => {
      if (yValues[b.dataKey] === undefined) return -1;
      if (yValues[a.dataKey] === undefined) return 1;
      return yValues[b.dataKey] - yValues[a.dataKey];
    };
    return payload.sort(compare);
  };

  sign = value => {
    if (value > 0) return '+';
    if (value === 0) return '';
    return '';
  };

  renderValue = y => {
    if (y.payload && y.payload[y.dataKey] !== undefined) {
      const signSymbol = this.sign(y.payload[y.dataKey]);
      return `${signSymbol}${format(',')(y.payload[y.dataKey])}%`;
    }
    return 'n/a';
  };

  render() {
    const { config, content } = this.props;
    const unit = config &&
      config.axes &&
      config.axes.yLeft &&
      config.axes.yLeft.unit;
    const name = config &&
      config.axes &&
      config.axes.yLeft &&
      config.axes.yLeft.name;
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipHeader}>
          <span className={cx(styles.labelName)}>
            {content.label} {name}
          </span>
          <span
            className={styles.unit}
            /* eslint-disable-line*/
            dangerouslySetInnerHTML={{ __html: unit }}
          />
        </div>
        {
          content &&
            content.payload &&
            content.payload.length > 0 &&
            content.payload.map(
              y =>
                y.payload &&
                  y.dataKey !== 'total' &&
                  config &&
                  config.tooltip &&
                  config.tooltip[y.dataKey] &&
                  config.tooltip[y.dataKey].label
                  ? (
                    <div key={`${y.dataKey}`} className={styles.label}>
                      <p className={styles.labelValue}>
                        {this.renderValue(y)}
                      </p>
                    </div>
)
                  : null
            )
        }
        {content && !content.payload && <div>No data fool</div>}
      </div>
    );
  }
}

GdpTooltipChart.propTypes = {
  content: Proptypes.object,
  config: Proptypes.object
};

GdpTooltipChart.defaultProps = { content: {}, config: {} };

export default GdpTooltipChart;
