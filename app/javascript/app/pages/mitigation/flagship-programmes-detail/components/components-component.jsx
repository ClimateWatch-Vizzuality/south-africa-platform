import React, { PureComponent } from 'react';
import FlagshipProgrammesProvider from 'providers/flagship-programmes-provider';
import { PropTypes } from 'prop-types';
import SectionTitle from 'components/section-title';
import FlagshipButtons from 'components/flagship-buttons';
import DataTable from 'components/data-table';
import styles from './components-styles';

class FlagshipProgrammesComponents extends PureComponent {
  handleFilterChange = value => {
    const { updateQueryParam, pageSection: section } = this.props;
    updateQueryParam({ id: value, section });
  };

  render() {
    const { data, defaultColumns } = this.props;
    return (
      <div className={styles.flagshipComponents}>
        <SectionTitle isSubtitle title="Components" className={styles.title} />
        <DataTable
          tableData={{ data, defaultColumns }}
          setColumnWidth={() => 180}
        />
        <SectionTitle
          isSubtitle
          title="Other Flagship Programmes"
          className={styles.title}
        />
        <FlagshipButtons
          handleFilterChange={this.handleFilterChange}
          className={styles.flagshipButtons}
        />
        <FlagshipProgrammesProvider />
      </div>
    );
  }
}

FlagshipProgrammesComponents.propTypes = {
  pageSection: PropTypes.string,
  data: PropTypes.array,
  defaultColumns: PropTypes.array,
  updateQueryParam: PropTypes.func.isRequired
};

FlagshipProgrammesComponents.defaultProps = {
  pageSection: null,
  data: null,
  defaultColumns: null
};

export default FlagshipProgrammesComponents;
