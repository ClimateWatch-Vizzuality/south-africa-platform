import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BubbleChart from 'components/bubble-chart';
import ModalMetadata from 'components/modal-metadata';
import { Dropdown, ButtonGroup, Button, Icon } from 'cw-components';

import iconInfo from 'assets/icons/info';
import iconDownload from 'assets/icons/download';

import styles from './summary-styles';

class Summary extends PureComponent {
  handleInfoClick = () => {
    const { setModalMetadata } = this.props;
    setModalMetadata({ slugs: 'mitigation_effects', open: true });
  };

  handleThemeChange = ({ value }) => {
    const { onFilterChange } = this.props;
    onFilterChange({ theme: value, summaryId: '' });
  };

  handleVisTypeChange = ({ value }) => {
    const { onFilterChange } = this.props;
    onFilterChange({ visType: value });
  };

  handleNodeClick = (e, id) => {
    e.preventDefault();
    const { onFilterChange } = this.props;
    onFilterChange({ summaryId: id });
  };

  render() {
    const {
      chartData,
      summarySelected,
      themeOptions,
      themeSelected,
      visTypeSelected,
      visTypeOptions
    } = this.props;
    return (
      <div>
        <div className={styles.columns}>
          <Dropdown
            label="Theme"
            value={themeSelected}
            options={themeOptions}
            onValueChange={this.handleThemeChange}
            hideResetButton
          />
          <Dropdown
            label="GHG Emissions Reduction"
            value={{}}
            options={{}}
            onValueChange={this.handleThemeChange}
            hideResetButton
            disabled
          />
          <Dropdown
            label="Visualization"
            value={visTypeSelected}
            options={visTypeOptions}
            onValueChange={this.handleVisTypeChange}
            hideResetButton
            disabled
          />
          <ButtonGroup theme={{ wrapper: styles.buttonGroupWrapper }}>
            <Button onClick={this.handleInfoClick}>
              <Icon icon={iconInfo} />
            </Button>
            <Button
              onClick={() => console.info('Clicked on download')}
              disabled
            >
              <Icon icon={iconDownload} />
            </Button>
          </ButtonGroup>
        </div>
        {
          visTypeSelected.value === 'bubble-chart'
            ? (
              <div className={styles.contentContainer}>
                <div className={styles.chartContainer}>
                  <BubbleChart
                    width={400}
                    height={400}
                    data={chartData}
                    handleNodeClick={this.handleNodeClick}
                    tooltipClassName="global_SATooltip"
                  />
                </div>
                <div className={styles.infoContainer}>
                  {
                  summarySelected && (
                  <div>
                    <p className={styles.label}>Policy</p>
                    <h2 className={styles.policy}>
                      {summarySelected.policy}
                    </h2>
                    <p className={styles.label}>Objectives</p>
                    <p className={styles.text}>
                      {summarySelected.objectives}
                    </p>
                    <p className={styles.label}>Actor</p>
                    <p className={styles.text}>{summarySelected.actor}</p>
                  </div>
                    )
                }
                </div>
              </div>
)
            : <div>TABLE</div>
        }
        <ModalMetadata />
      </div>
    );
  }
}

Summary.propTypes = {
  chartData: PropTypes.array,
  summarySelected: PropTypes.object,
  themeOptions: PropTypes.array,
  themeSelected: PropTypes.object,
  visTypeOptions: PropTypes.array,
  visTypeSelected: PropTypes.object,
  setModalMetadata: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

Summary.defaultProps = {
  chartData: [],
  summarySelected: null,
  themeOptions: [],
  themeSelected: null,
  visTypeOptions: [],
  visTypeSelected: null
};

export default Summary;
