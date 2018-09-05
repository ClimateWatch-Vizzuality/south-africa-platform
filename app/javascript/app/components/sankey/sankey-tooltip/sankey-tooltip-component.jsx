import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

import styles from './sankey-tooltip-styles.scss';

class SankeyTooltip extends PureComponent {
  render() {
    const { config, content } = this.props;
    return (
      <div className={styles.tooltip}>
        {
          content &&
            content.payload &&
            content.payload.length > 0 &&
            content.payload.map(
              node => node.payload ? (
                <div key={node.name}>
                  <div className={styles.tooltipHeader}>
                    <span className={styles.targetName}>
                      {
                        node.payload.payload &&
                          node.payload.payload.target &&
                          node.payload.payload.target.name
                      }
                    </span>
                    <span className={styles.unit}>
                      {config.unit}
                    </span>
                  </div>
                  <div className={styles.label}>
                    <div className={styles.legend}>
                      <span
                        className={styles.labelDot}
                        style={{
                          backgroundColor: node.payload.payload &&
                            node.payload.payload.source &&
                            node.payload.payload.source.color
                        }}
                      />
                      <p className={styles.labelName}>
                        {
                          node.payload.payload &&
                            node.payload.payload.source &&
                            node.payload.payload.source.name
                        }
                      </p>
                    </div>
                    <p className={styles.labelValue}>
                      {node.value}
                    </p>
                  </div>
                  <p className={styles.focus}>
                    {`Focus: ${config.focus}`}
                  </p>
                </div>
) : null
            )
        }
        {content && !content.payload && <div>No data</div>}
      </div>
    );
  }
}

SankeyTooltip.propTypes = {
  content: Proptypes.object,
  config: Proptypes.object
};

SankeyTooltip.defaultProps = { content: null, config: {} };

export default SankeyTooltip;