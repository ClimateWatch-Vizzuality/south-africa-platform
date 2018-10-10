import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import round from 'lodash/round';
import styles from './gdp-tooltip-styles.scss';

const renderLabel = (payload, config, label, column) => payload[column] && (
<div className={styles.label}>
  <span>
    {label} {config && config.suffix}
  </span>
  <span>
    {round(payload[column] * (config && config.scale || 1), 3)}
  </span>
</div>
  );

class CustomTooltip extends PureComponent {
  render() {
    const { content, config } = this.props;
    const hasContent = content && content.payload && content.payload.length > 0;
    const payload = content &&
      content.payload &&
      content.payload[0] &&
      content.payload[0].payload;
    const tooltipConfig = config.tooltip;
    return (
      <div className={styles.tooltip}>
        {
          hasContent ? (
            <div>
              <div className={styles.tooltipHeader}>
                <span className={styles.title}>
                  {hasContent && payload.x} {tooltipConfig.unit}
                </span>
              </div>
              {renderLabel(payload, tooltipConfig, 'USD', 'yGdp')}
              {renderLabel(payload, tooltipConfig, 'ZAR', 'yZar')}
            </div>
) : <div>No data</div>
        }
      </div>
    );
  }
}

CustomTooltip.propTypes = {
  content: Proptypes.object,
  config: Proptypes.object
};
CustomTooltip.defaultProps = { content: {}, config: {} };

export default CustomTooltip;
