import React from 'react';
import PropTypes from 'prop-types';
import { NoContent, Loading, Table } from 'cw-components';

const DataTable = ({ tableData, searchFilter, ...props }) => {
  if (!tableData.data) return <Loading height="660" />;
  const hasContent = tableData.data && tableData.data.length > 0;
  return hasContent
    ? (
      <Table
        horizontalScroll
        tableHeight={660}
        setRowsHeight={() => 120}
        dynamicRowsHeight
        hasColumnSelect={false}
        {...tableData}
        {...props}
      />
)
    : (
      <NoContent
        minHeight={330}
        message={
        searchFilter ? 'No data found with this search' : 'No data available'
      }
      />
);
};

DataTable.propTypes = {
  tableData: PropTypes.object,
  searchFilter: PropTypes.string
};

DataTable.defaultProps = { tableData: {}, searchFilter: null };
export default DataTable;
