import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Chart from 'components/chart';
import SectionTitle from 'components/section-title';
import ModalMetadata from 'components/modal-metadata';
import ProjectedEmissionsProvider from 'providers/projected-emissions-provider';

import InfoDownloadToolbox from 'components/info-download-toolbox';

import { Area, Line } from 'recharts';
import isUndefined from 'lodash/isUndefined';

import styles from './projected-emissions-styles.scss';

class ProjectedEmissions extends PureComponent {
  handleLegendChange = filtersSelected => {
    const { updateFilters } = this.props;
    updateFilters({ dataSelected: filtersSelected });
  };

  renderRangedAreas = () => {
    const { config } = this.props.chartData;

    return config && config.columns && config.columns.rangedArea.map(column => {
        const color = config.theme[column.value].stroke || '';
        return (
          <Area
            key={column.value}
            dataKey={column.value}
            dot={false}
            stroke={color}
            strokeWidth={2}
            isAnimationActive={
              isUndefined(config.animation) ? true : config.animation
            }
            fill={config.theme[column.value].fill || ''}
            type="linear"
          />
        );
      });
  };

  renderLinesWithDots = () => {
    const { config } = this.props.chartData;

    return config &&
      config.columns &&
      config.columns.lineWithDots.map(column => {
        const color = config.theme[column.value].stroke || '';
        return (
          <Line
            key={column.value}
            isAnimationActive={
              isUndefined(config.animation) ? true : config.animation
            }
            dot={{ strokeWidth: 0, fill: color, radius: 0.5 }}
            dataKey={column.value}
            stroke={color}
            strokeWidth={2}
            type="monotone"
          />
        );
      });
  };

  renderDotsLines = () => {
    const { config } = this.props.chartData;

    return config &&
      config.columns &&
      config.columns.dots.map(column => (
        <Line
          key={column.value}
          isAnimationActive={
            isUndefined(config.animation) ? true : config.animation
          }
          dataKey={column.value}
          stroke="#000000"
          strokeDasharray="1,09"
          strokeWidth="5"
          strokeLinecap="round"
          type="monotone"
        />
      ));
  };

  renderPlainLines = () => {
    const { config } = this.props.chartData;

    return config && config.columns.line.map(column => {
        const color = config.theme[column.value].stroke || '';
        return (
          <Line
            key={column.value}
            isAnimationActive={
              isUndefined(config.animation) ? true : config.animation
            }
            dot={false}
            dataKey={column.value}
            stroke={color}
            strokeWidth={2}
            type="monotone"
          />
        );
      });
  };

  render() {
    const { chartData } = this.props;
    return (
      <div className={styles.grid}>
        <div className={styles.toolbarWithSectionTitle}>
          <SectionTitle
            isSubtitle
            title="Projected Emissions"
            theme={{ sectionTitle: styles.title }}
          />
          <InfoDownloadToolbox slugs="projected_emissions" />
        </div>
        {
          chartData && chartData.config && (
          <Chart
            chartType="composed"
            height={500}
            {...chartData}
            onLegendChange={this.handleLegendChange}
          >
            {this.renderRangedAreas()}
            {this.renderLinesWithDots()}
            {this.renderDotsLines()}
            {this.renderPlainLines()}
          </Chart>
            )
        }
        <ProjectedEmissionsProvider />
        <ModalMetadata />
      </div>
    );
  }
}

ProjectedEmissions.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  chartData: PropTypes.object
};

ProjectedEmissions.defaultProps = { chartData: {} };

export default ProjectedEmissions;
