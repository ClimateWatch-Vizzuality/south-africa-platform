import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { Sankey, NoContent } from 'cw-components';
import has from 'lodash/has';
import styles from './flows-chart-styles.scss';

const renderTooltipChildren = selectedChildrenData =>
  has(selectedChildrenData, 'payload.payload.focus')
    ? (
      <p className={styles.focus}>
        {`Focus: ${selectedChildrenData.payload.payload.focus}`}
      </p>
)
    : null;

class FlowsChart extends PureComponent {
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
                tooltipChildren={selectedChildrenData =>
                renderTooltipChildren(selectedChildrenData)}
                nodePadding={30}
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
