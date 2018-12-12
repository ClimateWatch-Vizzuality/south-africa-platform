import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import DataTable from 'components/data-table';

class NonMonetizedTable extends PureComponent {
  render() {
    const { tableData } = this.props;
    return tableData &&
      (
        <DataTable
          tableData={tableData}
          setColumnWidth={() => 285}
          setRowsHeight={() => 200}
        />
      );
  }
}

NonMonetizedTable.propTypes = { tableData: PropTypes.object };

NonMonetizedTable.defaultProps = { tableData: null };

export default NonMonetizedTable;
