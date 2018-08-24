import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ChartComposed } from 'cw-components';

import SectionTitle from 'components/section-title';
import ModalMetadata from 'components/modal-metadata';
import ProjectedEmissionsProvider from 'providers/projected-emissions-provider';

import InfoDownloadToolbox from 'components/info-download-toolbox';

// Charts
import RangedArea from 'components/charts/ranged-area';
import LineWithDots from 'components/charts/line-with-dots';
import PlainLine from 'components/charts/plain-line';
import DotsLine from 'components/charts/dots-line';

import styles from './projected-emissions-styles.scss';

class ProjectedEmissions extends PureComponent {
  handleInfoClick = () => {
    const { setModalMetadata } = this.props;
    setModalMetadata({ slugs: 'historical_emissions_cait', open: true });
  };

  handleDownloadClick = () => {
    console.info('TODO: link todownload data endpoint', this.props);
  };

  handleLegendChange = filtersSelected => {
    const { updateFilters } = this.props;
    updateFilters({ dataSelected: filtersSelected });
  };

  rangedAreas = () => {
    const { config } = this.props.chartData;

    return config.columns && config.columns.rangedArea.map(column => {
        const color = config.theme[column.value].stroke || '';
        return (
          <RangedArea
            column={column}
            color={color}
            fill={config.theme[column.value].fill || ''}
            animation={config.animation}
          />
        );
      });
  };

  linesWithDots = () => {
    const { config } = this.props.chartData;

    return config.columns && config.columns.lineWithDots.map(column => {
        const color = config.theme[column.value].stroke || '';
        return (
          <LineWithDots
            column={column}
            color={color}
            animation={config.animation}
          />
        );
      });
  };

  dotsLines = () => {
    const { config } = this.props.chartData;

    return config.columns &&
      config.columns.dots.map(column => (
        <DotsLine
          column={column}
          color="#000000"
          animation={config.animation}
        />
      ));
  };

  plainLines = () => {
    const { config } = this.props.chartData;

    return config.columns.line.map(column => {
      const color = config.theme[column.value].stroke || '';
      return (
        <PlainLine
          key={column.value}
          column={column}
          color={color}
          animation={config.animation}
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
            title="Projected Emissions"
            theme={{ sectionTitle: styles.title }}
          />
          <InfoDownloadToolbox
            handleDownloadClick={this.handleDownloadClick}
            handleInfoClick={this.handleInfoClick}
          />
        </div>
        {
          chartData && (
          <ChartComposed
            height={500}
            {...chartData}
            onLegendChange={this.handleLegendChange}
          >
            {this.plainLines()}
          </ChartComposed>
            )
        }
        <ProjectedEmissionsProvider />
        <ModalMetadata />
      </div>
    );
  }
}

ProjectedEmissions.propTypes = {
  setModalMetadata: PropTypes.func.isRequired,
  updateFilters: PropTypes.func.isRequired,
  chartData: PropTypes.object.isRequired
};

ProjectedEmissions.defaultProps = {};

export default ProjectedEmissions;
