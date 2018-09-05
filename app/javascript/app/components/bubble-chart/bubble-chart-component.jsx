import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { chartDataCalculation } from './bubble-chart-d3-calculation';
import styles from './bubble-chart-styles';

class BubbleChart extends PureComponent {
  componentDidUpdate() {
    setTimeout(
      () => {
        ReactTooltip.rebuild();
      },
      100
    );
  }

  render() {
    const {
      width,
      height,
      handleNodeClick,
      data,
      tooltipClassName
    } = this.props;
    const charData = data && chartDataCalculation(width, data);
    return (
      <Fragment>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {
            charData && charData.children.map(d => (
                <g
                  key={d.value}
                  transform={`translate(${d.x},${d.y})`}
                  onClick={e => handleNodeClick(e, d.data.id)}
                >
                  <circle
                    r={d.r}
                    data-for="chartTooltip"
                    data-tip={`${d.data.value} ${d.data.unit}`}
                    fill={d.data.color}
                    className={styles.circle}
                  />
                </g>
              ))
          }
        </svg>
        <ReactTooltip
          place="left"
          id="chartTooltip"
          className={tooltipClassName}
        />
      </Fragment>
    );
  }
}

BubbleChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  handleNodeClick: PropTypes.func.isRequired,
  data: PropTypes.array,
  tooltipClassName: PropTypes.string
};

BubbleChart.defaultProps = { data: [], tooltipClassName: 'bubbleChartTooltip' };

export default BubbleChart;
