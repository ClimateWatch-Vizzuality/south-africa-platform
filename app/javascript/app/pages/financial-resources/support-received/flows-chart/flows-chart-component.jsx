import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { Sankey, NoContent } from 'cw-components';
import styles from './flows-chart-styles.scss';

class FlowsChart extends PureComponent {
  renderTooltipChildren() {
    const { config } = this.props;
    return (
      <p className={styles.focus}>
        {`Focus: ${config.tooltip && config.tooltip.focus}`}
      </p>
    );
  }

  render() {
    const { data, config } = this.props;
    return (
      <div>
        {
          data
            ? (
              <Sankey
                data={data}
                config={config}
                tooltipChildren={this.renderTooltipChildren()}
              />
)
            : <NoContent minHeight={660} message="No data available" />
        }
      </div>
    );
  }
}

FlowsChart.propTypes = { data: PropTypes.object, config: PropTypes.object };

FlowsChart.defaultProps = { data: null, config: null };

export default FlowsChart;
