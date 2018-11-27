import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { format } from 'd3-format';
import cx from 'classnames';

import styles from './hdi-tooltip-chart-styles.scss';

class HdiTooltipChart extends PureComponent {
  sortByValue = payload => {
    const yValues = payload[0].payload;
    const compare = (a, b) => {
      if (yValues[b.dataKey] === undefined) return -1;
      if (yValues[a.dataKey] === undefined) return 1;
      return yValues[b.dataKey] - yValues[a.dataKey];
    };
    return payload.sort(compare);
  };

  renderValue = y => {
    if (y.payload && y.payload[y.dataKey] !== undefined) {
      return `${format(',')(y.payload[y.dataKey])}`;
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
            {name} {content.label}
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
            this.sortByValue(content.payload, config).map(
              y =>
                y.payload &&
                  y.dataKey !== 'total' &&
                  config.tooltip[y.dataKey].label
                  ? (
                    <div key={`${y.dataKey}`} className={styles.label}>
                      <div className={styles.legend}>
                        {
                        (
                          <span
                            className={styles.labelDot}
                            style={{
                              backgroundColor: config.theme[y.dataKey] &&
                                config.theme[y.dataKey].stroke
                            }}
                          />
                        )
                      }
                        <p
                          className={cx(styles.labelName, {
                          [styles.notAvailable]: !(y.payload &&
                            y.payload[y.dataKey])
                        })}
                        >
                          {
                          config.theme[y.dataKey] &&
                            config.tooltip[y.dataKey].label
                        }
                        </p>
                      </div>
                      <p className={styles.labelValue}>
                        {this.renderValue(y)}
                      </p>
                    </div>
)
                  : null
            )
        }
        {content && !content.payload && <div>No data</div>}
      </div>
    );
  }
}

HdiTooltipChart.propTypes = {
  content: Proptypes.object,
  config: Proptypes.object
};

HdiTooltipChart.defaultProps = { content: {}, config: {} };

export default HdiTooltipChart;
