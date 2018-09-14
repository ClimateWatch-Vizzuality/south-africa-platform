import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { Sankey } from 'cw-components';
import styles from './international-selectors-styles.scss';

class International extends PureComponent {
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
          data &&
            (
              <Sankey
                data={data}
                config={config}
                tooltipChildren={this.renderTooltipChildren()}
              />
            )
        }
      </div>
    );
  }
}

International.propTypes = { data: PropTypes.object, config: PropTypes.object };

International.defaultProps = { data: null, config: null };

export default International;
