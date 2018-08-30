import React from 'react';
import PropTypes from 'prop-types';
import { NoContent, Loading, Table } from 'cw-components';

const SupportNeededTable = ({ tableData, searchFilter }) => {
  if (!tableData.data) return <Loading height="660" />;
  const hasContent = tableData.data && tableData.data.length > 0;
  return hasContent
    ? (
      <Table
        horizontalScroll
        tableHeight={660}
        setRowsHeight={() => 120}
        hasColumnSelect={false}
        {...tableData}
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

SupportNeededTable.propTypes = {
  tableData: PropTypes.object,
  searchFilter: PropTypes.string
};

SupportNeededTable.defaultProps = { tableData: {}, searchFilter: null };
export default SupportNeededTable;
